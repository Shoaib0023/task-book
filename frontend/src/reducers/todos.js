const initialState = {
    todos: [] 
}


const todosReducer = (state=initialState , action) => {

    switch(action.type){
        case 'ADD_TODO' :
            state.todos.unshift(action.todoobj)    
            return {
               ...state
            }
        case 'FETCH_TODOS':
            return {
                ...state ,
                todos: action.payload
            }
        
        case 'DELETE_TODO':
            return {
                ...state ,
                todos: state.todos.filter(todo => todo.id !== action.id)
            }
        
        case 'TOGGLE_CHECKBOX':
            return {
                ...state ,
                todos : state.todos.map(todo => (
                    todo.id === action.payload.id ? {...todo , completed: !todo.completed} : todo
            ))
        }

        case 'CRUCIAL_TODO':
            return {
                ...state ,
                todos : state.todos.map(todo => (
                    todo.id === action.payload.id ? {...todo , crucial: !todo.crucial} : todo
                ))
            }

        default:
           return {
               ...state 
           }
    }
}

export default todosReducer
