import React, {Component} from 'react'
import {connect} from 'react-redux';

class SearchContainer extends Component {
    copyButtonHandler = () => {
      var textBox = document.querySelector("input#" + this.props.id);
      textBox.disabled = false
      textBox.contentEditable = true
      textBox.select();
      document.execCommand("copy");
      textBox.disabled = true
    }

    copyToClipboard = () => {

        // resolve the element
        //el = (typeof el === 'string') ? document.querySelector(el) : el;
        var el = document.querySelector("input#" + this.props.id);

        // handle iOS as a special case
        if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {

            var editable = el.contentEditable;
            var readOnly = el.readOnly;

            el.contentEditable = true;
            el.readOnly = true;

            var range = document.createRange();
            range.selectNodeContents(el);

            var selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            el.setSelectionRange(0, 999999);

            el.contentEditable = editable;
            el.readOnly = readOnly;

        }
        else {
            el.disabled = false
            el.select();
            el.disabled = true

        }

        document.execCommand('copy');
        alert("Copied!")
    }


    render (){
        var full_url = window.location.origin //window.location.href
        var params = {}
        for (let device of Object.keys(this.props.drawer)){
          if (this.props.drawer[device]){
            params[device] = this.props.drawer[device].name
          }
        }

        var esc = encodeURIComponent;
        var query = Object.keys(params)
            .map(k => esc(k) + '=' + esc(params[k]))
            .join('&');

        full_url = full_url + "?" +query

        return (
          <React.Fragment>
            <h6>Share your comparison</h6>
            <div className="input-group mb-3">
              <input type="text" className="form-control" disabled={true} id={this.props.id} value={full_url}/>
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button" onClick={this.copyToClipboard}>Copy</button>
              </div>
            </div>
          </React.Fragment>
        )
    }

}

const mapStateToProp = state =>{
    return{
      drawer : state.main_reducer.drawer
    }
}

const mapDispatchToProp = dispatch => {
    return {
    }
}

export default  connect(mapStateToProp,mapDispatchToProp)(SearchContainer);
