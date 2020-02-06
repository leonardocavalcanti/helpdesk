import { combineReducers } from 'redux'
import ticketsReducer from './tickets/reducers'

export default combineReducers({
  tickets: ticketsReducer
})