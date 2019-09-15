import axios from 'axios' ;
import { ADD_TODO, FETCH_TODOS, DELETE_TODO, TOGGLE_CHECKBOX, CRUCIAL_TODO} from './types' ;

export const getTodos = () => dispatch => {
    const token = localStorage.getItem('token')
    const config = {
        'headers': {
            'Authorization': `Token ${token}`
        }
    }

    if (token){
        axios.get('http://127.0.0.1:8000/api/todos/', config)
        .then(res => {
            dispatch({
                type: FETCH_TODOS ,
                payload: res.data
            });
        })
        .catch(err => console.log(err))
    }
}

export const addTodo = (todoobj) => dispatch => {
    const token = localStorage.getItem('token')
    const config = {
        'headers': {
            'Authorization': `Token ${token}`
        }
    }
    axios.post('http://127.0.0.1:8000/api/todos/', todoobj , config)
    .then(res => {
        dispatch({
            type: ADD_TODO ,
            todoobj : todoobj
        })
        dispatch(getTodos())
    })
}

export const deleteTodo = (id) => dispatch => {
    const token = localStorage.getItem('token')
    const config = {
        'headers': {
            'Authorization': `Token ${token}`
        }
    }
    axios.delete(`http://127.0.0.1:8000/api/todos/${id}/`, config)
    .then(res => {
        dispatch({
            type: DELETE_TODO ,
            id: id
        })
        dispatch(getTodos())
    })
}

export const toggleCheckbox = (todoobj) => dispatch => {
    const token = localStorage.getItem('token')
    const config = {
        'headers': {
            'Authorization': `Token ${token}`
        }
    }
    const id = todoobj.id
    const todo = {
        'title': todoobj.title,
        'description': todoobj.description,
        'completed': !todoobj.completed ,
        'deadline': todoobj.deadline ,
        'crucial': todoobj.crucial
        }

    axios.put(`http://127.0.0.1:8000/api/todos/${id}/`, todo, config)
    .then(res => {
        dispatch({
            type: TOGGLE_CHECKBOX, 
            payload: todoobj
        })
        dispatch(getTodos())
    })
}


export const toggleCrucialTask = (todoobj) => dispatch => {
    const token = localStorage.getItem('token')
    const config = {
        'headers': {
            'Authorization': `Token ${token}`
        }
    }
    const id = todoobj.id
    const todo = {
        'title': todoobj.title,
        'description': todoobj.description,
        'completed': todoobj.completed ,
        'deadline': todoobj.deadline ,
        'crucial': !todoobj.crucial
        }

    axios.put(`http://127.0.0.1:8000/api/todos/${id}/`, todo, config)
    .then(res => {
        dispatch({
            type: CRUCIAL_TODO, 
            payload: todoobj
        })
        dispatch(getTodos())
    })
}