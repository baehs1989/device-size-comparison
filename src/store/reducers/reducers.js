const initialState = {
  devices : {
    0:null
  },
  drawer:{
    device1: null,
    device2: null
  },
  screen_view: false,
  color : ["rgba(189, 29, 29, 0.4)", "rgba(83, 90, 204, 0.4)"],
  items : []
}

const reducer = (state=initialState, action) => {
  switch( action.type ){
    case action.type = "DEVICE_SELECTED":
      return {
        ...state,
        drawer : {...state['drawer'], [action.device] : action.deviceInfo}
      }

    case action.type = "TOGGLE_VIEW":
      return {
        ...state,
        screen_view : action.view
      }

    case action.type = "UPDATE_PREDEFINED_LIST":
      var updated_list = {}
      updated_list[0] = null
      for (let mobile of action.data.data){
        updated_list[+mobile.id] = {...mobile}
      }

      var items = Object.keys(updated_list).slice(1).map((item) => [item,updated_list[item].name])

      return {
        ...state,
        devices: updated_list,
        items : items
      }

    default:
      return {
        ...state
      }
  }
}

export default reducer;
