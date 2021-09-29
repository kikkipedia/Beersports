const reducer = (state = [], action) => {
    switch(action.type) {
        case "updateDepartures":
            return [action.payload]
        default:
            return state
    }
}

export default reducer