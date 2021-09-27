import { combineReducers }  from 'redux'
import stationReducer from './stationReducer'

const reducers = combineReducers({
    station: stationReducer
})

export default reducers