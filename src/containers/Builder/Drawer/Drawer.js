import React, {Component} from 'react'
import {connect} from 'react-redux';
import Box from './Box/Box'

class Drawer extends Component {
    state = {
      width: null
    }

    resize = () => {
      this.setState({width: document.querySelector(".Drawer").clientWidth})
    }

    componentDidMount() {
      window.addEventListener('resize', this.resize)
      this.setState({width: document.querySelector(".Drawer").clientWidth})
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.resize)
    }

    render (){
        //Find maximum width
        var widths = Object.values(this.props.device).map((device) => device? device.device_size.height_mm: 0)
        var base = Math.max(...widths)
        base = this.state.width ? this.state.width / base * 0.8: 0

        //Generate Box elements
        var devices = Object.values(this.props.device)
          .filter((device) => ! (device === null))
          .map((device, index) => {
            return <Box size={this.state.width} width={device.device_size.width_mm * base} height={device.device_size.height_mm*base} depth={device.device_size.depth_mm*base} background={this.props.color[index]} key={index} id={"device"+(index+1)}/>
          })

          var screens = Object.values(this.props.device)
            .filter((device) => ! (device === null))
            .map((device, index) => {
              return <Box size={this.state.width} width={device.screen_size.width_mm * base} height={device.screen_size.height_mm*base} depth={0} background={this.props.color[index]} key={index} id={"screen"+(index+1)}/>
            })

        return (
            <div className="Drawer" style={{"position":"relative", 'height':this.state.width+"px", 'maxWidth':'500px', 'marginLeft' :'0'}}>
              {!this.props.view ? devices : null}
              {this.props.view ? screens: null}
            </div>
        )
    }

}

const mapStateToProp = state =>{
    return{
      device : state.main_reducer.drawer,
      view : state.main_reducer.screen_view,
      color: state.main_reducer.color
    }
}

const mapDispatchToProp = dispatch => {
    return {

    }
}

export default  connect(mapStateToProp,mapDispatchToProp)(Drawer);
