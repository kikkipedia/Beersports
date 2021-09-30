import { combineReducers }  from 'redux'
import stationReducer from './stationReducer'
import nameReducer from './nameReducer'
import tramReducer from './tramReducer'

const reducers = combineReducers({
    station: stationReducer,
    stationName: nameReducer,
    tram: tramReducer
})

export default reducers