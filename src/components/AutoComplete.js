import React, { useState } from "react"

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

    return(
        <>
            <input type="text"/>
        </>
    )
}
export default AutoComplete