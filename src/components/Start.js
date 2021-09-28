import React, { useState } from 'react'
import { Button, Col } from 'react-bootstrap'
import { fetchStationByName } from '../api'
import { InputGroup, FormControl } from 'react-bootstrap'
import { stops } from './data/stops'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index'

const Start = () => {
    //redux
    const dispatch = useDispatch()
    const {updateStationId, updateStationName} = bindActionCreators(actionCreators, dispatch)
    //search values
    const [filteredSuggestions, setFilteredSuggestions] = useState([])
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0)
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [input, setInput] = useState('')

    const history = useHistory()

    const onChange = (e) => {
        const userInput = e.target.value
        //filter suggestions that dont contain user input
        const unLinked = stops.filter((suggestion) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1)
        setInput(e.target.value)
        setFilteredSuggestions(unLinked)
        setActiveSuggestionIndex(0)
        setShowSuggestions(true)
    }

    const onClick = (e) => {
        setFilteredSuggestions([])
        setInput(e.target.innerText)
        setActiveSuggestionIndex(0)
        setShowSuggestions(false)      
    }

    const SuggestionsListComponent = () => {
        return filteredSuggestions.length ? (
            <ul className="suggestions">
                {filteredSuggestions.map((suggestion, index) => {
                    let className
                    //flag the active suggestion with a class
                    if(index === activeSuggestionIndex) {
                        className = "suggestion-active"
                    }
                    return(
                        <li className={className} key={suggestion} onClick={onClick}>
                            {suggestion}
                        </li>
                    )
                    
                })}
            </ul>
        ) : (
            <div className="no-suggestions">
                <em>No stops found</em>
            </div>
        )
    }

    // TODO
    const rollDiceOne = () => {
        //if no search and/or no suggestions - TODO
        if (!input) {
            //do nothing
            console.log("empty!")
        }
        else {
            updateStationName(input)
            getStation()
        }
        
    }

    //search for stop
    const getStation = () => {
        console.log(input)
        try {
            fetchStationByName(input)
            .then(data => {
            let object = data.StopLocation.find(el => el.products === 64 || 192)
            //id to redux store
            updateStationId(object.id)
            history.push("/game")
        })
        }
        catch(error) { console.log(error) }
    }

    return(
        <div className="content">
            <div className="one">
                <p>Search your starting station</p>
                <div className="justify-content-center">
                    <Col className="md-6">
                        <InputGroup>
                            <FormControl placeholder="Search station" type="text" onChange={onChange} value={input} />
                        </InputGroup>
                        {showSuggestions && input && <SuggestionsListComponent/>}
                    </Col>
                    <Col className="md-2">
                        {input ? (
                            <Button onClick={rollDiceOne}>Continue</Button>
                        ) : (null)
                        
                        }
                    </Col>
                </div>
            </div>
            <br/>
        </div>
    )

}

export default Start