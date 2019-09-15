import axios from 'axios' ;
import * as actionTypes from './types' ;
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = token => {
    return {
        type: actionTypes.AUTH_SUCCESS, 
        token: token 
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL ,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('user') ;
    localStorage.removeItem('token') ;
    localStorage.removeItem('expirationDate') ;
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const getUserSuccess= (user) => {
    return {
        type: actionTypes.GET_USER_SUCCESS ,
        user: user
    }
}

export const getUserFail = (error) => {
    return {
        type: actionTypes.GET_USER_FAIL ,
        error: error
    }
}

export const getUser = (token) => {
    const config = {
        headers: {
            "Content-Type": "application/json" ,
            "Authorization" : `Token ${token}` ,
        }
    }

    return dispatch => {
        axios.get('http://127.0.0.1:8000/api/user/', config)
        .then(res => {
            // console.log(res)
            dispatch(getUserSuccess(res.data))
        })
        .catch(err => {
            dispatch(getUserFail(err))
        })
    }
}

const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout()) ;
        }, expirationTime * 1000)
    }
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart()) ;
        axios.post('http://127.0.0.1:8000/rest-auth/login/', {
            username : username, 
            password: password
        })
        .then(res => {
            const token = res.data.key
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('token', token)
            localStorage.setItem('expirationDate', expirationDate)
            
            dispatch(authSuccess(token)) ;
            dispatch(getUser(token))
            dispatch(checkAuthTimeout(3600)) ;
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const authSignup = (username, email, password1, password2) => {
    return dispatch => {
        dispatch(authStart()) ;
        axios.post('http://127.0.0.1:8000/rest-auth/registration/', {
            username : username, 
            email: email ,
            password1: password1 ,
            password2: password2
        })
        .then(res => {
            const token = res.data.key
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('token', token)
            localStorage.setItem('expirationDate', expirationDate)
            
            dispatch(authSuccess(token)) ;
            dispatch(getUser(token)) ;
            dispatch(checkAuthTimeout(3600)) ;
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token') ;
        if (token === undefined) {
            dispatch(logout()) ;
        }
        else{
            const expirationDate = new Date(localStorage.getItem('expirationDate')) ;
            if ( expirationDate <= new Date() ){
                dispatch(logout()) ;
            }
            else{
                dispatch(authSuccess(token)) ;
                dispatch(getUser(token)) ;
                dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000 ))   
            }
        }
    }
}