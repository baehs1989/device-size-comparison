import React, {Component} from 'react'
import {connect} from 'react-redux';
import AutoCompleteText from '../AutoCompleteText/AutoCompleteText'

class SearchContainer extends Component {


    render (){


        return (
          <React.Fragment>
            <div className="row justify-content-center justify-content-md-around">
              {/*<DisplayOption name="DISPLAY 1" id="display1" inputChangeHanlder={(event, display) => this.props.inputChangeHanlder(event, display)}/>*/}
              <div className={this.props.id + " jumbotron col-12 col-md-5 m-2 py-2"}>
                <h5 className="my-3">Choose Your Devices</h5>

                <AutoCompleteText name="Device 1" id="device1"/>
                <AutoCompleteText name="Device 2" id="device2"/>

              </div>

            </div>
            {/*<button type="submit" className="btn btn-secondary m-2 btn-lg">COMPARE</button>*/}
          </React.Fragment>
        )
    }

}

const mapStateToProp = state =>{
    return{
      devices: state.main_reducer.devices,
      items : state.main_reducer.items
    }
}

const mapDispatchToProp = dispatch => {
    return {

    }
}

export default  connect(mapStateToProp,mapDispatchToProp)(SearchContainer);
