import React, {Component} from 'react'
import {connect} from 'react-redux';

import SearchContainer from './SearchContainer/SearchContainer'
import Drawer from './Drawer/Drawer'
import Table from './Table/Table'
import InputCpy from './InputCpy/InputCpy'

import * as actions from '../../store/actions/actions'

class Builder extends Component {
    // inputChangeHanlder = (event, display) => {
    //   console.log(display, event.target)
    // }

    render (){
        var devices = Object.values(this.props.device).filter((device) => ! (device === null))
        var table = null

        if (devices.length > 0) {
          var device_size_data = []
          for (let device of devices){
            let inner_data = []
            for (var prop of Object.keys(device.device_size)){
              inner_data.push(device.device_size[prop])
            }
            inner_data.push(device.mass)
            device_size_data.push(inner_data)
          }

          for (let data of device_size_data){
            for (let i=0 ; i<data.length - 1; i++){
              data[i] = data[i] + " mm / " + (data[i] / 25.4).toFixed(2) + " inch"
            }
            data[data.length-1] = data[data.length-1] + " g"
          }


          var screen_size_data = []
          for (let device of devices){
            var ratio = device.screen_size.height + "x" + device.screen_size.width
            let inner_data = [device.screen_size.size_mm, ratio]
            screen_size_data.push(inner_data)
          }

          for (let data of screen_size_data){
            for (let i=0 ; i<data.length - 1; i++){
              data[i] = data[i] + " mm / " + (data[i] / 25.4).toFixed(2) + " inch"
            }
          }

          if (this.props.view){
            table = (
              <Table
                data={screen_size_data}
                padding="mt-5"
                header = {["Size", "Ratio"]}
              />
            )
          }
          else{
            table = (
              <Table
                data={device_size_data}
                padding="mt-0 mt-lg-5"
                header = {["Width", "Height", "Depth", "Mass"]}
              />
            )
          }
        }

        return (
            <div className="container">
              <div className="row mt-3">
                <div className="col-sm">
                  <SearchContainer/>
                </div>
              </div>

              <div className='row justify-content-center'>
                <div className="col-sm-12 col-md-5">
                  <div className={this.props.view ? "btn btn-outline-secondary mx-2" : "btn btn-outline-secondary selected"} onClick={() => this.props.toggleHandler(false)}>
                    Device
                  </div>
                  <div className={!this.props.view ? "btn btn-outline-secondary mx-2" : "btn btn-outline-secondary selected"} onClick={() => this.props.toggleHandler(true)}>
                    Screen
                  </div>
                </div>
              </div>

              {Object.values(this.props.device).filter(device => device !== null).length ?
                <React.Fragment>
                  <div className="row mt-5">
                    <div className="col-sm-12 col-md-5">
                      <Drawer/>
                    </div>
                    <div className="col-sm-12 col-md-7">
                      {table}
                    </div>
                  </div>

                  <div className="row mt-5">
                    <div className="col-sm-12">
                      <InputCpy id="inputCpy1"/>
                    </div>
                  </div>
                </React.Fragment>
               :
                null
              }


            </div>



        )
    }

}

const mapStateToProp = state =>{
    return{
      device : state.main_reducer.drawer,
      view : state.main_reducer.screen_view
    }
}

const mapDispatchToProp = dispatch => {
    return {
      toggleHandler: (view) => dispatch(actions.toggleView(view))
    }
}

export default  connect(mapStateToProp,mapDispatchToProp)(Builder);
