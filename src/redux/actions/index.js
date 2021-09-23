import { ADD_STOP, UPDATE_STOPID } from "./action-types"

//type describes how the state should change
//payload describes what should change

export function addStop(payload) {
    return {
        type: ADD_STOP, payload
    }
}

export function setStopId(payload) {
    return {
        type: UPDATE_STOPID, payload
    }
}