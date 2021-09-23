import { useState } from "react"
import { connect } from "react-redux"
import { addStop } from "../redux/actions"
import { fetchDepartureBoard } from "../api"

const Game = () => {
    const [departures, setDepartures] = useState([])
    const [stationId, setStationId] = useState() //get from redux store?

    //get station id from redux store

    //adds stop to redux store so it wont be used again
    const mapDispatchToProps = (dispatch) => {
        return {
            addStop: stop => dispatch(addStop(stop))
        }
    } 

    //get station info
    const getDepartureboard = () => {
        console.log(stationId)
        //dispatches an action
        addStop(stationId)
        fetchDepartureBoard(stationId)
        .then(data => {
            console.log(data)
            setDepartures(data)
        })
    }

    return(
        <div className="content">

        </div>
    )
}
export default Game