import { combineReducers } from 'redux'
import app from './app'
import board from './board'
import home from './home'

export default combineReducers({
    app,
    board,
    home,
})
