import React, {Component} from 'react';
import './App.css';
import axios from 'axios'
import AddTodo from './components/addTodo'
import SideBar from './components/sideBar'
import TodoHeader from './components/todoHeader'
 
class App extends Component {
  constructor(){
      super()
      this.state = {
        todos: []
      }     
  }

  async componentDidMount(){
    const res = await axios.get('http://127.0.0.1:8000/api/todos/')
    const todos = res.data
    this.setState({
      todos,
    })
  }

  addTodo = async (todoobj) => {
    const todo = {
        'title': todoobj.title,
        'description': todoobj.description,
        'completed': "false" ,
        'deadline': todoobj.deadline ,
        'crucial': "false"
    }

    if(todoobj){
      const {data} = await axios.post('http://127.0.0.1:8000/api/todos/', todo)
      const currentTodos = this.state.todos
      this.setState({
          'todos' : currentTodos.concat(data)
      })
    }
  }

  todoValue(obj){
    return (obj.completed ? 'True' : 'False')
  }

  deleteTodo = async (event, pk) => {
    const response = await axios.delete(`http://127.0.0.1:8000/api/todos/${pk}`)
    this.componentDidMount() ;
  }

  crucialTodo = async(event, obj) => {
    const pk = obj.id
    const todo = {
      'title': obj.title,
      'description': obj.description,
      'completed': obj.completed ,
      'deadline': obj.deadline ,
      'crucial': !obj.crucial
    }
    const response = await axios.put(`http://127.0.0.1:8000/api/todos/${pk}/`, todo)
    this.componentDidMount() ;
  }

  handleCheckbox = async(todo, e) => {
    const todo1 = {
       "title": todo.title ,
       "description": "Nothing..", 
       "completed" : !todo.completed
    }

    await axios.put(`http://127.0.0.1:8000/api/todos/${todo.id}/`, todo1)
    this.componentDidMount() ;
  }

  todoTitle = (obj) => {
    if(obj.completed === true){
      return (
        <h4 id="todotitle" style={checkboxDecoration} >{obj.title}</h4>
      )
    }
    else {
      return <h4 id="todotitle" className="text-secondary">{obj.title}</h4>
    }
  }

  handleChecked = (obj) => {
    if(obj.completed === true){
      return true
    }
    else{
      return false
    }
  }

  handleDeadline = (obj) => {
    if(obj.completed === true){
      return <span className="badge badge-success">Completed</span>
    }
    else{
      return <span className="badge badge-primary">{obj.deadline}</span>
    }
  }

  crucialTaskButton = (todo) => {
    if (todo.crucial === true){
      return <button type="submit" className="btn btn-group btn-sm btn-success m-2 float-right" onClick={event => this.crucialTodo(event, todo)}><span><i className="fa fa-star"></i></span></button>
    }
    else{
      return <button type="submit" className="btn btn-group btn-sm btn-warning m-2 float-right" onClick={event => this.crucialTodo(event, todo)}><span><i className="fa fa-star"></i></span></button>
    }
  }

  crucialTaskTag = (todo) => {
    if (todo.crucial === true){
      return <span className="badge badge-success m-2">Crucial</span>
    }
  } 

  render(){
    return (
            <div className="row" id="section">
              <div className="col-lg-2 col-md-12 pr-0">
                  <SideBar />
              </div>

             <div className="col-lg-7 col-md-12" id="todos">
                <TodoHeader todos={this.state.todos}/>
                {this.state.todos.map(todo => (
                  <div className="row m-3" key={todo.id}>
                    <div className="col-md-12 col-sm-12" id="todocontainer">
                      <div className="container">

                        <div className="row p-lg-3">
                          <div className="col-2">
                            <input type="checkbox" id="checkbox" onChange={(e) => this.handleCheckbox(todo, e)} checked={this.handleChecked(todo)} className="mt-lg-4"/>
                          </div>
                          <div className="col-6">
                            {this.todoTitle(todo)} 
                            {this.handleDeadline(todo)}
                            {this.crucialTaskTag(todo)}
                          </div>
                          <div className="col-4">
                            {this.crucialTaskButton(todo)}
                            <button type="submit" className="btn btn-group btn-sm btn-danger m-2 float-right" onClick={event => this.deleteTodo(event, todo.id)}><span><i className="fa fa-trash"></i></span></button>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                  ))}
                  </div>
                <div className="col-lg-3 col-md-12 p-0 bg-dark" id="addtodo">
                   <AddTodo addTodo={this.addTodo}/>
                </div>
             </div>
    )}}; 
     

const checkboxDecoration = {
  textDecoration : "line-through" ,    
  color: "grey" ,
}

export default App;

