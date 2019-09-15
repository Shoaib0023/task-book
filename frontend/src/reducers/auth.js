const initialState = {
    token: null,
    error: null ,
    loading: false, 
    user: null, 
    getUserError: null 
};

export const auth = (state=initialState, action) => {

    switch(action.type){
        case 'AUTH_START' :
            return {
                ...state, 
                error: null ,
                loading: true, 
                getUserError: null
            }

        case 'AUTH_SUCCESS' :
            return {
                ...state, 
                error :null ,
                loading : false ,
                token : action.token
            }

        case 'AUTH_FAIL' :
            return {
                ...state, 
                error: action.error ,
                loading: false
            }

        case 'AUTH_LOGOUT' :
            return {
                ...state, 
                token: null, 
                user: null ,
                getUserError: null 
            }

        case 'GET_USER_SUCCESS':
            return {
                ...state ,
                user: action.user ,
                getUserError: null
            }
        
        case 'GET_USER_FAIL':
            return {
                ...state ,
                user: null ,
                getUserError: action.error
            }

        default:
            return state
    }
}