
//const initial_state = localStorage.getItem('station') || ''

const reducer = (state = '', action) => {
    switch(action.type) {
        case "updateName":
            return action.payload
        default:
            return state
    }
}

export default reducer