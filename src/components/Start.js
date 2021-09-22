import React, { useEffect, useState } from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { fetchStationByName, fetchDepartureBoard, fetchAllStations } from '../api'
import Autosuggest from 'react-autosuggest'
import autoComplete from "@tarekraafat/autocomplete.js"

const Start = () => {

    const [stops, setStops] = useState([])
    const [stationName, setStationName] = useState()
    const [stationId, setStationId] = useState()
    const [departures, setDepartures] = useState([])
    //array of station suggestions
    const [suggestions, setSuggestions] = useState([])
    const [value, setValue] = useState('')
    const [text, setText] = useState('')
    const [show, setShow] = useState(false)


    useEffect(() => {
        fetchAllStations()
        .then(data => {
            setStops(data.stops)
        })
    })


    //search for stop
    // const getStation = () => {
    //     console.log(stationName)
    //     try {
    //         fetchStationByName(stationName)
    //         .then(data => {
    //         //only trams in gothenburg
    //         let object = data.StopLocation.find(el => el.products === 192 || 64)
    //         setStationName(object.name)
    //         setStationId(object.id)
    //         setShow(true)
    //     })
    //     }
    //     catch(error) { console.log(error) }
    // }

    //get station info
    // const getDepartureboard = () => {
    //     console.log(stationId)
    //     fetchDepartureBoard(stationId)
    //     .then(data => {
    //         console.log(data)
    //         setDepartures(data)
    //     })
    // }
    const config = {
        placeHolder: "Search...",
        data: {
            src: stops
        },
        resultItem: {
            highlight: {
                render: true
            }
        }
    }
    const autoCompleteJS = new autoComplete({ config })


    return(
        <div className="content">
            <p>Search your starting station</p>
            <autoCompleteJS></autoCompleteJS>
            {/* <input id="autoComplete" type="search" dir="ltr" spellcheck="false" autocorrect="off" autocomplete="off" autocapitalize="off" maxlength="2048" tabindex="1"></input> */}

        </div>
    )

}
export default Start