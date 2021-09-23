import React, { useState } from "react"
import { fetchDepartureBoard } from "../api"

const Game = () => {
    const [departures, setDepartures] = useState([])
    const [stationId, setStationId] = useState() //get from redux store?

    //get station info from props?
    const getDepartureboard = () => {
        console.log(stationId)
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