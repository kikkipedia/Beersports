
export const updateStationId = (id) => {
    return (dispatch) => {
        dispatch({
            type: "updateId",
            payload: id
        })
    }
}

export const updateStationName = (name) => {
    return (dispatch) => {
        dispatch({
            type: "updateName",
            payload: name
        })
    } 
}
//adds to array of visited stops
export const addStationName = (name) => {

}

export const updateTram = (tram) => {
    return (dispatch) => {
        dispatch({
            type: "updateTram",
            payload: tram
        })
    }
}

export const updateDepartures = (departures) => {
    return (dispatch) => {
        dispatch({
            type: "updateDepartures",
            payload: departures
        })
    }
}