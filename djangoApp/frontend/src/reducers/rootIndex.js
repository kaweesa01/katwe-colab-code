import { combineReducers } from 'redux'
import BlogReducer from './BlogReducer'
import auth from './auth'

export default combineReducers({
    BlogReducer,
    auth
});