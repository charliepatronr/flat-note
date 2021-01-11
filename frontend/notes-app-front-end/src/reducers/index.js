import { combineReducers } from 'redux'
import notesReducer from './notesReducer'
import authReducer from './authReducer'
// import usersReducer from './usersReducer'




// does everyaction hit every localReducer: yes it hits every reducer
// what will state be for each of those reducers: state will be just the states of that key


export default combineReducers({
    notes : notesReducer,
    auth : authReducer
})