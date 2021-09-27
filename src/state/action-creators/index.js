
export const updateStationId = (id) => {
    return (dispatch) => {
        dispatch({
            type: "update",
            payload: id
        })
    }
}