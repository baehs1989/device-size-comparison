import React, { Component} from "react";
import {connect} from 'react-redux';
import classes from './AutoCompleteText.module.css'
import {withRouter} from 'react-router-dom'

import * as actions from '../../../store/actions/actions'

import axios from '../../../axios-mobile';

class AutoCompleteText extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // The active selection's index
      activeSuggestion: null,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      length : 0,
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: "",
      // First visited
      firstVisit: true
    };

  }

  retreieveData(userInput){
    if (userInput.trim().length > 0){
      axios.get('/'+userInput)
          .then(response => {
              this.setState({filteredSuggestions:response.data.data, length:response.data.data.length})
          })
          .catch(error => {
            this.props.history.push('/error')
          });
    }else{
      console.log(userInput.length)
      this.setState({filteredSuggestions:[], length:0, userInput:userInput.trim()})
    }

  }

  componentDidMount(){
    var search = window.location.search;
    var params = new URLSearchParams(search);
    var device = params.get(this.props.id);
    console.log(device)

    if (device && this.state.firstVisit){
      console.log(device)
      if (this.state.userInput === ""){
        // this.retreieveData(device).then(() => {
        //   console.log("HI")
        // })

      var promise = new Promise( (resolve, reject) => {

        axios.get('/'+device)
            .then(response => {
                resolve(response.data.data)
            })
            .catch(error => {
              this.props.history.push('/error')
            });

      });

      promise.then(result => {
        if (result.length > 0) {
          this.setState({
            userInput : device,
          })
          this.props.deviceSelectHandler(this.props.id, result[0])
        }
      })

      }
      this.setState({
        firstVisit : false,
      })
    }

  }


  // Event fired when the input value is changed
  onChange = e => {
    const userInput = e.currentTarget.value;
    this.retreieveData(userInput)

    this.setState({
      activeSuggestion: 0,
      showSuggestions: true,
      userInput: userInput
    });

  };

  // Event fired when the user clicks on a suggestion
  onClick = e => {
    // Update the user input and reset the rest of the state

    this.props.deviceSelectHandler(this.props.id, this.state.filteredSuggestions[e.currentTarget.id])

    this.setState({
      activeSuggestion: null,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };

  // Event fired when the user presses a key down
  onKeyDown = e => {

    const { activeSuggestion } = this.state;

    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
      if (this.state.length > 0 && !(activeSuggestion === null)){
        this.props.deviceSelectHandler(this.props.id, this.state.filteredSuggestions[this.state.activeSuggestion])

        this.setState({
          activeSuggestion: 0,
          showSuggestions: false,
          userInput: this.state.filteredSuggestions[this.state.activeSuggestion].name
        });
      }
      else{
        this.setState({
          activeSuggestion: null,
          showSuggestions: false
        });
      }


    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion === this.state.length - 1 ) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    let suggestionsListComponent;

    if (this.state.showSuggestions && this.state.userInput) {
      if (Object.keys(this.state.filteredSuggestions).length) {
        suggestionsListComponent = (
          <ul className={classes.suggestions}>
            {this.state.filteredSuggestions.map((suggestion,index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === +this.state.activeSuggestion) {
                className = classes.suggestion_active;
              }

              return (
                <li
                  className={className}
                  id={index}
                  key={suggestion.id}
                  onClick={this.onClick}
                >
                  {suggestion.name}
                </li>
              );
            })}
          </ul>
        );
      }
    }

    return (
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-default">{this.props.name}</span>
        </div>
        <input
          style={{
                "WebkitTouchCallout": "none",
                "WebkitUserSelect": "none",
                "KhtmlUserSelect": "none",
                "MozUserSelect": "none",
                "MsUserSelect": "none",
                "UserSelect": "none"
          }}
          autoComplete="off"
          onPaste={e => e.preventDefault()}
          type="text"
          className="form-control"
          id={this.props.id}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          value={this.state.userInput}
        />
        {suggestionsListComponent}
      </div>
    )
  }
}

const mapStateToProp = state => {
  return{
    devices: state.main_reducer.devices,
    items : state.main_reducer.items
  }
}

const mapDisPatchToProp = dispatch => {
  return {
    deviceSelectHandler: (device, deviceid) => dispatch(actions.deviceSelected(device, deviceid)),
  }
}

export default connect(mapStateToProp, mapDisPatchToProp)(withRouter(AutoCompleteText));
