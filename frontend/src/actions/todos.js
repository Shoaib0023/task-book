import axios from 'axios' ;
import { ADD_TODO, FETCH_TODOS, DELETE_TODO, TOGGLE_CHECKBOX, CRUCIAL_TODO} from './types' ;

export const getTodos = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/todos/')
    .then(res => {
        dispatch({
            type: FETCH_TODOS ,
            payload: res.data
        });
    })
    .catch(err => console.log(err))
}

export const addTodo = (todoobj) => dispatch => {
    axios.post('http://127.0.0.1:8000/api/todos/', todoobj)
    .then(res => {
        dispatch({
            type: ADD_TODO ,
            todoobj : todoobj
        })
    })
}

export const deleteTodo = (id) => dispatch => {
    axios.delete(`http://127.0.0.1:8000/api/todos/${id}/`)
    .then(res => {
        dispatch({
            type: DELETE_TODO ,
            id: id
        })
    })
}

export const toggleCheckbox = (todoobj) => dispatch => {
    const id = todoobj.id
    const todo = {
        'title': todoobj.title,
        'description': todoobj.description,
        'completed': !todoobj.completed ,
        'deadline': todoobj.deadline ,
        'crucial': todoobj.crucial
        }

    axios.put(`http://127.0.0.1:8000/api/todos/${id}/`, todo)
    .then(res => {
        dispatch({
            type: TOGGLE_CHECKBOX, 
            payload: todoobj
        })
    })
}


export const toggleCrucialTask = (todoobj) => dispatch => {
    const id = todoobj.id
    const todo = {
        'title': todoobj.title,
        'description': todoobj.description,
        'completed': todoobj.completed ,
        'deadline': todoobj.deadline ,
        'crucial': !todoobj.crucial
        }

    axios.put(`http://127.0.0.1:8000/api/todos/${id}/`, todo)
    .then(res => {
        dispatch({
            type: CRUCIAL_TODO, 
            payload: todoobj
        })
    })
}

// export const registerUser = (user) => dispatch => {
//     axios.post('http://127.0.0.1:8000/api/auth/register/', user)
//     .then(res => {
//         dispatch({
//             type: REGISTER_USER ,
//             payload : user
//         })
//     })
// }