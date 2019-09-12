import { applyMiddleware, createStore } from 'redux' ;
import thunk from 'redux-thunk' ;
import { composeWithDevTools } from 'redux-devtools-extension' ;

import rootReducer from './reducers' ;

const initialState = {}

const middlewares = [thunk] 

let store = createStore(
    rootReducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middlewares)))

export default store