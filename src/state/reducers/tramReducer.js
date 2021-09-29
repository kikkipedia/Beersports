
const reducer = (state = null, action) => {
    switch(action.type) {
        case "updateTram":
            return action.payload
        default:
            return state
    }
}

export default reducer