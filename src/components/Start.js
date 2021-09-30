import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
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

    const [showButton, setShowButton] = useState(false)
    const history = useHistory()

    localStorage.clear()

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
        setShowButton(true)  
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
            // toggle noShowButton
            <div className="no-suggestions">
                <em>Inga hållplatser hittades</em>
            </div>
        )
    }

    const rollDiceOne = () => {
        //if no input
        if (!input) {
            alert("kan inte lämnas tom!")
        }
        else {
            localStorage.setItem('startStation', input)
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
            <br/>
            <h4><span style={{fontSize:'40px'}}>&#127870;</span> dags för pubrunda <span style={{fontSize:'40px'}}>&#127867;</span></h4>
            <br/>
                    <InputGroup>
                        <FormControl placeholder="Sök hållplats" type="text" onChange={onChange} value={input} />
                    </InputGroup>
                    {showSuggestions && input && <SuggestionsListComponent/>}

                    <br/>
                    {showButton ? (
                        <Button variant="light" onClick={rollDiceOne}>FORTSÄTT</Button>
                    ) : (null)   
                    }

        </div>
    )

}

export default Start