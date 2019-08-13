import React, {Component} from 'react'
import {connect} from 'react-redux';

class Drawer extends Component {

    render (){
        var devices = Object.values(this.props.device).filter((device) => ! (device === null))

        var tbody = this.props.header.map((h,i) => {
          return (
            <tr key={i}>
              <th scope="row">{h}</th>
              {this.props.data.map((d,j) => {
                return <td key={j}>{d[i]}</td>
              })}
            </tr>
          )
        })


        return (
          <table className={this.props.padding + " table px-4"}>
            <thead>
              <tr>
                {devices.length > 0 ? <th scope="col"></th> : null}
                {devices.map((device,index) => {
                  return <th scope="col" key={index} style={{"background":this.props.color[index]}}>{device.name}</th>
                })}
              </tr>
            </thead>
            <tbody>
              {tbody}
            </tbody>
          </table>
        )
    }

}

const mapStateToProp = state =>{
    return{
      device : state.main_reducer.drawer,
      color: state.main_reducer.color
    }
}

const mapDispatchToProp = dispatch => {
    return {

    }
}

export default  connect(mapStateToProp,mapDispatchToProp)(Drawer);
