import { combineReducers } from 'redux'
import BlogReducer from './BlogReducer'
import auth from './auth'
import errors from './errors'
import message from './message'
import readMore from './readMore'

export default combineReducers({
    BlogReducer,
    auth,
    errors,
    message,
    readMore
});