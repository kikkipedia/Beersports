import { combineReducers }  from 'redux'
import stationReducer from './stationReducer'
import nameReducer from './nameReducer'

const reducers = combineReducers({
    station: stationReducer,
    stationName: nameReducer
})

export default reducers