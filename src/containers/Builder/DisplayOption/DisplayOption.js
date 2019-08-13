import React, {Component} from 'react'
import {connect} from 'react-redux';

class DisplayOption extends Component {
    // state = {
    //   width:null,
    //   height:null,
    //   size:null,
    //   unit:null,
    //   ready:false
    // }
    //
    // inputChangedHandler = (event) => {
    //   console.log(event.target.id)
    //   console.log(event.target.value)
    //   this.setState({'size':3})
    // }

    render (){
        return (
          <div className={this.props.id + " jumbotron col-12 col-md-5 m-2 py-2"} onChange={(event) => this.props.inputChangeHanlder(event, this.props.id)}>
            <h5 className="my-3">{this.props.name}</h5>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor={this.props.id + "Aspect"}>Aspect</label>
              </div>
              <select className="custom-select" id="aspect">
                <option value="0">Choose...</option>
                <option value="1">16 x 9 Widescreen</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor={this.props.id + "Size"}>Size</label>
              </div>
              <input type="number" className="form-control" id="size"/>
              <select className="custom-select" id="unit">
                <option value="1">Inches</option>
                <option value="2">Centimetres</option>
              </select>
            </div>

          </div>
        )
    }

}


export default DisplayOption;
