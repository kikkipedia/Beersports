import React, { useState } from "react"
import { InputGroup, FormControl } from 'react-bootstrap'

const AutoComplete = ({ suggestions }) => {

    const [filteredSuggestions, setFilteredSuggestions] = useState([])
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0)
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [input, setInput] = useState('')

    const onChange = (e) => {
        const userInput = e.target.value
        //filter suggestions that dont contain user input
        const unLinked = suggestions.filter((suggestion) =>
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

    return(

        <div className="content">
            <InputGroup size="sm" className="col-md-6">
                <FormControl placeholder="Search station" type="text" onChange={onChange} value={input} />
            </InputGroup>
            {showSuggestions && input && <SuggestionsListComponent/>}
        </div>

    )
}
export default AutoComplete