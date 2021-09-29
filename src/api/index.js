

const resrobotKey = "17764716-b110-479b-923c-047792e2f33d"

//from local file
export const fetchAllStations = () => {
    return fetch('stations.json')
    .then(response => response.json())
}

//from api
export const fetchStationByName = (name) => {
    return fetch("https://api.resrobot.se/v2/location.name?key="+ resrobotKey + "&input=" + name + ", Göteborg&format=json")
    .then(result => result.json())
}

export const fetchDepartureBoard = (stationId) => {
    return fetch("https://api.resrobot.se/v2/departureBoard?key=2a14c983-ad0d-4aba-964f-7b5fa88121b5&id=" + stationId + "&products=64&maxJourneys=30&format=json")
    .then(result => result.json())
}