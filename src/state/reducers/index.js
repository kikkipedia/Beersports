import { combineReducers }  from 'redux'
import stationReducer from './stationReducer'
import nameReducer from './nameReducer'
import tramReducer from './tramReducer'
import departuresReducer from './departuresReducer'

const reducers = combineReducers({
    station: stationReducer,
    stationName: nameReducer,
    tram: tramReducer,
    departures: departuresReducer
})

export default reducers