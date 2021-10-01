import React, { useState, useEffect } from "react"
import { Button } from "react-bootstrap"
import { fetchDepartureBoard } from "../api"
import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index'
import { useHistory } from 'react-router'
import { fetchStationByName } from "../api"

const Game = () => {
    const history = useHistory()
    let startStation = localStorage.getItem('startStation')
    //redux 
    const stationId = useSelector((state) => state.station)
    const stationName = useSelector((state) => state.stationName)
    const tram = useSelector((state) => state.tram)
    const dispatch = useDispatch()
    const {updateStationName, updateStationId, updateTram} = bindActionCreators(actionCreators, dispatch)
    //hooks
    const [isLoading, stopLoading] = useState(true)
    const [tramNumb, setTramNumb] = useState('')
    const [stops, setStops] = useState()
    const [direction, setDirection] = useState()
    const [end, setEnd] = useState()
    //toggle shows
    const [showStart, setShowStart] = useState(true)
    const [showTramNumb, setShowTramNumb] = useState(false)
    const [showDirection, setShowDirection] = useState(false)
    const [showStops, setShowStops] = useState(false)
    const [result, setResult] = useState(false)

    //get departure board for the current station
    useEffect(() => {
        try {
            fetchDepartureBoard(stationId)
            .then(data => {
            let stationArr = []
            for(let i = 0; i <data.Departure.length; i++){
                stationArr.push(data.Departure[i])
            }
            rollTram(stationArr)
        })
        }
        catch(error) {
            console.log(error)
            alert(error)
            history.push("/")
        }
    },[stationId])

    //wait for redux tram state to update
    useEffect(() => {
        stopLoading(false)
        if(isLoading) {
            console.log("is loading")
        }
        else {
            randomiseStop()
        }
    },[tram])

    //trim string
    const trimText = (text) => {
        let newText = text.replace(/Göteborg|kn|()/g,'')
        let new2 = newText.replace("(", "")
        let new3 = new2.replace(")", "")
        return new3
    }

    //which tram to take
    const rollTram = (stationArr) => {
        updateTram(stationArr[Math.floor(Math.random()*30)])
    }

    //random stops to travel
    const rollTheRest = () => {
        let stopArr = tram.Stops.Stop
        if(stopArr.length > 0) {
            let random = Math.floor(Math.random()*stopArr.length)
            if(random > 0 && random < 15) {
                let endhpl = stopArr[random]
                setStops(random)
                setEnd(trimText(endhpl.name))
                updateStationName(trimText(endhpl.name))
            }             
            else {
                rollTheRest()
            }     
        }
        else {alert("Det går inga spårvagnar!")} 
    }

    const randomiseStop = () => {
        stopLoading(false)
        if(tram.transportNumber === "Spårvagn X") {
            rollTram()
        }
        else {
            setTramNumb(tram.transportNumber) // slow!
            setDirection(trimText(tram.direction))
            rollTheRest()           
        }      
    }

    //toggle show/hide
    const firstStep = () => {
        setShowTramNumb(true)
        setShowStart(false)
    }

    const rollDice1 = () => {
        setShowTramNumb(false)
        setShowDirection(true)
    }

    const rollDice2 = () => {
        setShowDirection(false)
        setShowStops(true)
    }

    const rollDice3 = () => {
        setShowStops(false)
        setResult(true)
    }

    //new stop
    const shuffleNewStop = () => {
        rollTheRest()
    }

    //start next tram ride // TODO
    const restart = () => {
        localStorage.setItem('startStation', end)
        setShowStart(true)
        //has the new station name
        fetchStationByName(stationName)
        .then(data => {
        let object = data.StopLocation.find(el => el.products === 64 || 192)
        //id to redux store
        updateStationId(object.id)
        })
        setResult(false)
    }
    
    return (
        <div className="content">
            <br/>
            {showStart ? (
                <div>
                <p>Starta vid <span>{startStation}</span></p> 
                <Button variant="light" onClick={firstStep}>SLÅ TÄRNING</Button>
            </div>
             ) : null
            }
                
            { showTramNumb ? (
                <div>
                    <br/>
                    <p>Ta spårvagn</p>
                    <p><span style={{fontSize:"10vw"}}>{tram.transportNumber}</span></p>
                    <Button variant="light" onClick={rollDice1}>SLÅ TÄRNING</Button>
                </div>
            ) : null

            }
            
            {showDirection ? (
                <div>
                    <p>Spårvagn <span>{tramNumb}</span></p>
                     <p>Riktning:</p> 
                     <p><span>{direction}</span></p>
                    <Button variant="light" onClick={rollDice2}>SLÅ TÄRNING</Button>
                </div>
            ) : null}
            
            {showStops ? (
                <div>
                    <p>Antal hållplatser:</p>
                    <p><span style={{fontSize:"10vw"}}>{stops}</span> </p>
                    <Button variant="light" onClick={rollDice3}>VART SKA VI?</Button>
                </div>
            ) : null}
            
            {result ? (
                <div>
                    <p>Åk till <span>{end}</span> <span style={{fontSize:'7vw'}}>&#127867;</span><br/>
                    <span style={{fontSize: "x-small", color:"white"}}>Missnöjd? Klicka <Button className="smallBtn" onClick={shuffleNewStop}>här</Button> för att slumpa ett annat stopp</span></p>
                    <br/>
                    <span style={{fontSize:'10vw'}}>&#127870;</span>
                    <p><Button variant="light" onClick={restart}>Nästa ölstopp!</Button></p>
                    
                    
                </div>
                
            ) : null
            }           
        </div>
    )
}
export default Game