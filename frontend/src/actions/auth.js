import axios from 'axios' ;
import { USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL } from './types' ;

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
    
    dispatch({type: USER_LOADING })

    // GET TOKEN FROM STATE
    const token = getState().auth.token ;

    //HEADERS
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    if (token) {
        config.headers["Authorization"] = `Token ${token}` ;
    }

    axios.get('http://127.0.0.1:8000/api/auth/user/', config)
    .then(res => {
        dispatch({
            type: USER_LOADED ,
            payload: res.data
        }) ;
    }).catch(err => {
        dispatch({
            type: AUTH_ERROR
        })
    })

}


export const login = (username, password) => dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({username, password}) ;

    axios.post('http://127.0.0.1:8000/api/auth/login/', body, config)
    .then(res => {
        dispatch({
            type: LOGIN_SUCCESS ,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: LOGIN_FAIL
        })
    })
}