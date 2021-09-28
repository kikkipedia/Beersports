
const reducer = (state = '', action) => {
    switch(action.type) {
        case "updateName":
            return action.payload
            //add to array
        // case "addName":
        //     return action.payload
        default:
            return state
    }
}

export default reducer