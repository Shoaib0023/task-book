const initialState = {
    token: localStorage.getItem('token') ,
    isAuthenticated: null ,
    isLoading: false ,
    user: null 
};

export const auth = (state=initialState, action) => {
    switch(action.type){
        case 'USER_LOADING':
            return {
                ...state, 
                isLoading: true 
            }
        
        case 'USER_LOADED':
            return {
                ...state, 
                isLoading: false ,
                isAuthenticated: true,
                user: action.payload
            };
        
        case 'AUTH_ERROR':
        case 'LOGIN_FAIL':
            localStorage.removeItem('token')
            return {
                ...state, 
                isLoading: false ,
                isAuthenticated: false,
                user: null ,
                token: null
            };
                
        case 'LOGIN_SUCCESS':
            localStorage.setItem('token', action.payload.token)
            return {
                ...state ,
                ...action.payload ,
                isAuthenticated: true, 
                isLoading: false
            }

        default:
            return state
    }
}