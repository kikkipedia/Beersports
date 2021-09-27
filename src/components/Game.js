import React, { useState, useEffect } from "react"
import { Button } from "react-bootstrap"
import { fetchDepartureBoard } from "../api"
import { useSelector } from "react-redux"

const Game = () => {
    const stationId = useSelector((state) => state.station)
    const [departures, setDepartures] = useState([])

    //get departure board for the station they are at
    //TODO try catch
    useEffect(() => {
        console.log(stationId)
        fetchDepartureBoard(stationId)
        .then(data => {
            console.log(data)
            setDepartures(data)
        })
    },[stationId])

    //which tram to take
    const rollTram = () => {
        //get tram numbers for that station
        let stationArr = []
        for(let i = 0; i <departures.Departure.length; i++){
            stationArr.push(departures.Departure[i].Product.num)
        }
        console.log(stationArr)

    }
    

    return(
        <div className="content">
            <h4>2.</h4>
            <p>You are starting at</p>
            <Button onClick={rollTram}>ROLL DICE</Button>
            
        </div>
    )
}
export default Game