import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Layout from './components/Layout/Layout'
import Builder from './containers/Builder/Builder'
import {connect} from 'react-redux';
import * as actions from './store/actions/actions'

import {Route, Switch} from 'react-router-dom'

class App extends Component {

  componentDidMount(){
    //this.props.initMobieOption()
  }

  render(){
    return (
        <div className="App container">
          <Layout/>
          <Switch>
            <Route path="/error" exact render={() => <div style={{"padding":"2em", "marginTop":"2em"}}>Sorry for the inconvenience. <br/>Our site is temporarily unavailable.<br/>Please try again later.</div>}/>
            <Route path="/" component={Builder}/>
          </Switch>
        </div>
    );
  }

}

const mapStateToProp = state => {
  return{
  }
}

const mapDisPatchToProp = dispatch => {
  return {
    initMobieOption : () => dispatch(actions.init())
  }
}

export default connect(mapStateToProp, mapDisPatchToProp)(App);
