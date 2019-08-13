import axios from '../../axios-mobile';

// export const update = (event , display) => {
//   return {
//     type: "UPDATE",
//     display:display,
//     event: event
//   }
// }
//
// export const afterUpdateValue = (display) => {
//   return {
//     type: "AFTER_UPDATE_VALUE",
//     display:display
//   }
// }
//
// export const updateValue = (event, display) => {
//   return dispatch => {
//     event.persist()
//     dispatch(update(event, display))
//     dispatch(afterUpdateValue(display))
//   }
// }

export const updatePredefinedList = (data) => {
  return {
    type: "UPDATE_PREDEFINED_LIST",
    data: data
  }
}

export const init = () => {
  return dispatch => {
    axios.get('/')
        .then(response => {
            dispatch(updatePredefinedList(response.data))
        })
        .catch(error => {

        });
  }
}


export const retreiveData = (search) => {
  return dispatch => {
    axios.get('/'+search)
        .then(response => {
            console.log(response.data)
            dispatch(updatePredefinedList(response.data))
        })
        .catch(error => {

        });
  }
}

export const deviceSelected = (device, deviceInfo) => {
  return {
    type: "DEVICE_SELECTED",
    device: device,
    deviceInfo: deviceInfo
  }
}

export const toggleView = (view) => {
  return {
    type: "TOGGLE_VIEW",
    view: view
  }
}
