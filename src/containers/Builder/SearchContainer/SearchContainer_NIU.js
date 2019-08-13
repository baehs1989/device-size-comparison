// import React, { Component} from "react";
// import {connect} from 'react-redux';
// import classes from './AutoCompleteText.module.css'
//
// import * as actions from '../../../store/actions/actions'
// import axios from '../../../axios-mobile';
//
// class AutoCompleteText extends Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       // The active selection's index
//       activeSuggestion: null,
//       // The suggestions that match the user's input
//       filteredSuggestions: [],
//       // Whether or not the suggestion list is shown
//       showSuggestions: false,
//       // What the user has entered
//       userInput: "",
//       // First visited
//       firstVisit: true,
//     };
//
//   }
//
//
//   //
//   // componentWillMount(){
//   //   let search = window.location.search;
//   //   let params = new URLSearchParams(search);
//   //   let device = params.get(this.props.id);
//   //
//   //   if (device){
//   //     console.log(device)
//   //     console.log(this.props.items)
//   //     console.log(this.props.devices)
//   //   }else{
//   //     console.log(device)
//   //   }
//   //
//   // }
//
//   retreiveData(search) {
//     axios.get('/'+search)
//         .then(response => {
//           var updated_list = {}
//           updated_list[0] = null
//           for (let mobile of response.data.data){
//             updated_list[+mobile.id] = {...mobile}
//           }
//
//           this.setState({filteredSuggestions: updated_list})
//
//         })
//         .catch(error => {
//
//         });
//   }
//
//
//   componentDidUpdate(){
//     // const userInput = this.state.userInput;
//     // var previousValue = userInput.slice(0, userInput.length-1)
//     // console.log(userInput, previousValue)
//     // console.log(this.state.items)
//
//     //this.items = Object.keys(this.props.devices).slice(1).map((item) => [item,this.props.devices[item].name])
//
//     // if (this.state.userInput.length === 0){
//     //   this.props.deviceSelectHandler(this.props.id, 0)
//     // }
//     //
//     // var search = window.location.search;
//     // var params = new URLSearchParams(search);
//     // var device = params.get(this.props.id);
//     //
//     // if (device && this.state.firstVisit){
//     //   console.log(device)
//     //   if (this.state.userInput === ""){
//     //     var filteredSuggestions = this.props.items.filter(
//     //       suggestion =>
//     //         suggestion[1].toLowerCase().indexOf(device.toLowerCase()) > -1
//     //     );
//     //     if (filteredSuggestions.length > 0) {
//     //       this.setState({
//     //         userInput : device,
//     //       })
//     //
//     //       this.props.deviceSelectHandler(this.props.id, filteredSuggestions[0][0])
//     //     }
//     //   }
//     //   this.setState({
//     //     firstVisit : false,
//     //   })
//     //
//     // }else{
//     //
//     // }
//
//   }
//
//
//   // Event fired when the input value is changed
//   onChange = e => {
//     const userInput = e.currentTarget.value;
//     //this.props.retreiveData(userInput);
//     this.retreiveData(userInput)
//
//     this.setState({
//       userInput: userInput
//     });
//
//     // var filteredSuggestions = this.state.items.filter(
//     //   suggestion =>
//     //     suggestion[1].toLowerCase().indexOf(userInput.toLowerCase()) > -1
//     // );
//
//     this.setState({
//       activeSuggestion: 0,
//       showSuggestions: true,
//       userInput: userInput
//     });
//
//     // const userInput = e.currentTarget.value;
//     // var finalInput = e.currentTarget.value
//     // var previousValue = e.currentTarget.value.slice(0, e.currentTarget.value.length-1)
//     //
//     // this.props.retreiveData("iphone")
//     //
//     //
//     //
//     // // Filter our suggestions that don't contain the user's input
//     // var filteredSuggestions = this.props.items.filter(
//     //   suggestion =>
//     //     suggestion[1].toLowerCase().indexOf(userInput.toLowerCase()) > -1
//     // );
//     //
//     // if (filteredSuggestions.length === 0) {
//     //   finalInput = previousValue
//     //
//     //   filteredSuggestions = this.props.items.filter(
//     //     suggestion =>
//     //       suggestion[1].toLowerCase().indexOf(finalInput.toLowerCase()) > -1
//     //   );
//     //
//     // }
//     //
//     //
//     // if (userInput.length === 0 ){
//     //   this.setState({
//     //     activeSuggestion: null,
//     //     filteredSuggestions:[],
//     //     userInput: finalInput
//     //   });
//     //   return
//     // }
//     //
//     // // Update the user input and filtered suggestions, reset the active
//     // // suggestion and make sure the suggestions are shown
//     // this.setState({
//     //   activeSuggestion: 0,
//     //   filteredSuggestions:filteredSuggestions,
//     //   showSuggestions: true,
//     //   userInput: finalInput
//     // });
//
//
//
//   };
//
//   // Event fired when the user clicks on a suggestion
//   onClick = e => {
//     // Update the user input and reset the rest of the state
//
//     this.props.deviceSelectHandler(this.props.id, +e.currentTarget.id)
//
//     this.setState({
//       activeSuggestion: null,
//       filteredSuggestions: [],
//       showSuggestions: false,
//       userInput: e.currentTarget.innerText
//     });
//   };
//
//   // Event fired when the user presses a key down
//   onKeyDown = e => {
//
//     const { activeSuggestion, filteredSuggestions } = this.state;
//
//     // User pressed the enter key, update the input and close the
//     // suggestions
//     if (e.keyCode === 13) {
//       if (filteredSuggestions.length > 0 && !(activeSuggestion === null)){
//         this.props.deviceSelectHandler(this.props.id, filteredSuggestions[activeSuggestion][0])
//
//         this.setState({
//           activeSuggestion: 0,
//           showSuggestions: false,
//           userInput: filteredSuggestions[activeSuggestion][1]
//         });
//       }
//       else{
//         this.setState({
//           activeSuggestion: null,
//           showSuggestions: false
//         });
//       }
//
//
//     }
//     // User pressed the up arrow, decrement the index
//     else if (e.keyCode === 38) {
//       if (activeSuggestion === 0) {
//         return;
//       }
//
//       this.setState({ activeSuggestion: activeSuggestion - 1 });
//     }
//     // User pressed the down arrow, increment the index
//     else if (e.keyCode === 40) {
//       if (activeSuggestion === filteredSuggestions.length - 1) {
//         return;
//       }
//       this.setState({ activeSuggestion: activeSuggestion + 1 });
//     }
//   };
//
//   render() {
//     let suggestionsListComponent;
//
//     if (this.state.showSuggestions && this.state.userInput) {
//       if (this.state.filteredSuggestions.length) {
//         suggestionsListComponent = (
//           <ul className={classes.suggestions}>
//             {this.state.filteredSuggestions.map((suggestion, index) => {
//               let className;
//
//               // Flag the active suggestion with a class
//               if (index === this.state.activeSuggestion) {
//                 className = classes.suggestion_active;
//               }
//
//               return (
//                 <li
//                   className={className}
//                   id={suggestion[0]}
//                   key={suggestion[0]}
//                   onClick={this.onClick}
//                 >
//                   {suggestion[1]}
//                 </li>
//               );
//             })}
//           </ul>
//         );
//       }
//       // else {
//       //   suggestionsListComponent = (
//       //     <div className={classes.no_suggestions}>
//       //       <em>No suggestions, you're on your own!</em>
//       //     </div>
//       //   );
//       // }
//     }
//
//
//
//
//
//     return (
//       <div className="input-group mb-3">
//         <div className="input-group-prepend">
//           <span className="input-group-text" id="inputGroup-sizing-default">{this.props.name}</span>
//         </div>
//         <input
//           autoComplete="off"
//           onPaste={e => e.preventDefault()}
//           type="text"
//           className="form-control"
//           id={this.props.id}
//           onChange={this.onChange}
//           onKeyDown={this.onKeyDown}
//           value={this.state.userInput}
//         />
//         {suggestionsListComponent}
//       </div>
//     );
//   }
// }
//
// const mapStateToProp = state => {
//   return{
//     devices: state.main_reducer.devices,
//     items : state.main_reducer.items
//   }
// }
//
// const mapDisPatchToProp = dispatch => {
//   return {
//     deviceSelectHandler: (device, deviceid) => dispatch(actions.deviceSelected(device, deviceid)),
//     //retreiveData: (search) => dispatch(actions.retreiveData(search))
//   }
// }
//
// export default connect(mapStateToProp, mapDisPatchToProp)(AutoCompleteText);
