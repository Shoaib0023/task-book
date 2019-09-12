import { combineReducers } from 'redux' ;
import todosReducer from './todos' ;
import { auth } from './auth' ;

export default combineReducers({
    todosReducer, 
    auth,
})