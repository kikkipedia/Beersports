import { ADD_STOP, UPDATE_STOPID } from "../actions/action-types"

const initialState = {
    stopsHistory: [],
    startStationId: 0
}

//saves all stops already visited except the first stop
function rootReducer(state = initialState, action) {
    if(action.type === ADD_STOP) {
        //copy of initial state. avoid mutations!
       return Object.assign({}, state, {
           stopsHistory: state.stopsHistory.concat(action.payload)
       })
    }
    //update to current/next stop id
    if(action.type === UPDATE_STOPID) {
        //update state
        return Object.assign({}, state, {
            startStationId: action.payload
        })
    }
    return state
}

export default rootReducer