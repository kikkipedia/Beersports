import React, { useState, useEffect } from "react"
import { Button } from "react-bootstrap"
import { fetchDepartureBoard } from "../api"
import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index'
import { useHistory } from 'react-router'

const Game = () => {
    const history = useHistory()
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
    //toggle show
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
            setDepartures(data)
        })
        }
        catch(error) {
            console.log(error)
            alert(error)
            history.push("/")
        }
    },[stationName])

    //trim string
    const trimText = (text) => {
        let newText = text.replace(/Göteborg|kn|()/g,'')
        return newText
    }

    //which tram to take
    const rollTram = () => {
        setShowStart(false)
        //get tram numbers for that station
        let stationArr = []
        for(let i = 0; i <departures.Departure.length; i++){
            stationArr.push(departures.Departure[i])
        }
        //random tram
        let tram = stationArr[Math.floor(Math.random()*stationArr.length)]
        if(tram.transportNumer === "Spårvagn X") {
            rollTram()
        }
        else {
            setTramNumb(tram.transportNumber)
            setDirection(trimText(tram.direction))
            //random stops to travel
            let stopArr = tram.Stops.Stop
            if(stopArr.length > 0) {
                let random = Math.floor(Math.random()*stopArr.length)               
                //travel no more than 10 stops
                if (random > 10) {
                    rollTram()
                }
                else {
                    let endhpl = stopArr[random]
                    setStops(random)
                    setEnd(trimText(endhpl.name))
                    updateStationName(trimText(endhpl.name))
                    setShowTramNumb(true)
                }
            }
            else {alert("Det går inga spårvagnar!")}            
        }      
    }

    //toggle show/hide
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

    //start next tram ride
    const restart = () => {
        localStorage.setItem('station', stationName)
        setResult(false)
        setShowStart(true)
    }
    
    return (
        <div className="content">
            { showStart ?  (
                <div>
                    <p>Du startar vid</p> 
                    <p><span>{stationName}</span></p>
                    <Button variant="light" onClick={rollTram}>SLÅ TÄRNING</Button>
                </div>
            ) : null
            }
            { showTramNumb ? (
                <div>
                    <br/>
                    <p>Ta spårvagn <span>{tramNumb}</span></p>
                    <Button variant="light" onClick={rollDice1}>SLÅ TÄRNING</Button>
                </div>
            ) : null

            }
            
            {showDirection ? (
                <div>
                    <p>Spårvagn <span>{tramNumb}</span></p>
                     <p>Riktning <span>{direction}</span></p>
                    <Button variant="light" onClick={rollDice2}>SLÅ TÄRNING</Button>
                </div>
            ) : null}
            
            {showStops ? (
                <div>
                    <p>Åk <span>{stops}</span> hållplatser</p>
                    <Button variant="light" onClick={rollDice3}>VART SKA VI?</Button>
                </div>
            ) : null}
            
            {result ? (
                <div>
                    <p>Åk till: <span>{end}</span> och drick öl!</p>
                    <p>Klicka <Button variant="light" onClick={restart}>här</Button> för nästa spårvagnstur</p>
                </div>
            ) : null

            }
            
        </div>
    )
}
export default Game