import React, { useState, useEffect } from "react"
import { Button } from "react-bootstrap"
import { fetchDepartureBoard } from "../api"
import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index'

const Game = () => {
    //redux 
    const stationId = useSelector((state) => state.station)
    const stationName = useSelector((state) => state.stationName)
    const dispatch = useDispatch()
    const {updateStationName} = bindActionCreators(actionCreators, dispatch)
    //hooks
    const [departures, setDepartures] = useState([])
    const [tramNumb, setTramNumb] = useState()
    const [stops, setStops] = useState()
    const [direction, setDirection] = useState()
    const [end, setEnd] = useState()

    //get departure board for the station they are at
    //TODO try catch
    useEffect(() => {
        fetchDepartureBoard(stationId)
        .then(data => {
            console.log(data)
            setDepartures(data)
        })
    },[stationId])

    //trim string
    const trimText = (text) => {
        let newText = text.replace(/Göteborg|kn|()/g,'')
        return newText
    }

    //which tram to take
    const rollTram = () => {
        //get tram numbers for that station
        let stationArr = []
        for(let i = 0; i <departures.Departure.length; i++){
            stationArr.push(departures.Departure[i])
        }
        console.log(stationArr)
        //random tram
        let tram = stationArr[Math.floor(Math.random()*stationArr.length)]
        console.log(tram)
        if(tram.transportNumer === "Spårvagn X") {
            rollTram()
        }
        else {
            setTramNumb(tram.transportNumber)
            setDirection(trimText(tram.direction))
            //random stops to travel
            let stopArr = tram.Stops.Stop
            let random = Math.floor(Math.random()*stopArr.length)
            //TODO IF TOO MANY STOPS???
            let endhpl = stopArr[random]
            setStops(random)
            setEnd(trimText(endhpl.name))
            updateStationName(trimText(endhpl.name))
        }
        
    }
    
    return(
        <div className="content">
            <h4>2.</h4>
            <p>Du startar vid {stationName}</p>
            <Button onClick={rollTram}>ROLL DICE</Button>
            <h4>3.</h4>
            <p>Ta spårvagn {tramNumb}</p>
            <Button>ROLL DICE</Button>
            <h4>4.</h4>
            <p>Åk {stops} hållplatser</p>
            <Button >ROLL DICE</Button>
            <h4>5.</h4>
            <p>Mot {direction}</p>
            <h4>6.</h4>
            <p>Åk till: {end}</p>
        </div>
    )
}
export default Game