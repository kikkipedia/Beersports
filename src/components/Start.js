import React, { useEffect, useState } from 'react'
import { Button, Table, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { fetchStationByName, fetchDepartureBoard, fetchAllStations } from '../api'
import AutoComplete from './Search/AutoComplete'
import { stops } from './Search/stops'

const Start = () => {

    const [stationName, setStationName] = useState()
    const [stationId, setStationId] = useState()
    const [departures, setDepartures] = useState([])
    //array of station suggestions
    const [suggestions, setSuggestions] = useState([])
    const [value, setValue] = useState('')
    const [text, setText] = useState('')
    const [show, setShow] = useState(false)


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



    return(
        <div className="content">
            <p>Search your starting station</p>
            <Row>
                <Col><AutoComplete suggestions={stops}/></Col>
                <Col><Button><FontAwesomeIcon icon={faSearch}/></Button></Col>
            </Row>
        </div>
    )

}
export default Start