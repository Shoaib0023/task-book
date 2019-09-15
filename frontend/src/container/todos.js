import React, { Component } from 'react' ;
import { connect } from 'react-redux' ;
import PropTypes from 'prop-types' ;
import { deleteTodo, toggleCheckbox, toggleCrucialTask } from '../actions/todos' ;
import { bindActionCreators } from 'redux';

class Todos extends Component {
    static propTypes = {
        todos: PropTypes.array.isRequired ,
        deleteTodo: PropTypes.func.isRequired ,
        toggleCrucialTask: PropTypes.func.isRequired
    }
    

    todoTitle = (obj) => {
        if(obj.completed === true){
           return (
             <h4 id="todotitle" style={checkboxDecoration} >{obj.title}</h4>
            )}
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
        else {
           return <span className="badge badge-primary">{obj.deadline}</span>
        }
    }

    crucialTaskButton = (todo) => {
        if (todo.crucial === true){
           return <button type="submit" className="btn btn-group btn-sm btn-success m-2 float-right" onClick={this.props.toggleCrucialTask.bind(this, todo)}><span><i className="fa fa-star"></i></span></button>
        }
        else {
           return <button type="submit" className="btn btn-group btn-sm btn-warning m-2 float-right" onClick={this.props.toggleCrucialTask.bind(this, todo)}><span><i className="fa fa-star"></i></span></button>
        }
    }

    crucialTaskTag = (todo) => {
        if (todo.crucial === true){
           return <span className="badge badge-warning m-2 text-dark">Crucial</span>
        }
    }

    render() {
        return (
            <React.Fragment>
            {this.props.todos.map(todo => (
                <div className="row m-3" key={todo.id}>
                    <div className="col-md-12 col-sm-12" id="todocontainer"> 
                        <div className="container">
                            <div className="row p-lg-3">
                              <div className="col-2">
                                <input type="checkbox" id="checkbox" onChange={this.props.toggleCheckbox.bind(this, todo)} checked={this.handleChecked(todo)} className="mt-lg-4"/>
                              </div>
                              <div className="col-6">
                                {this.todoTitle(todo)}
                                {this.handleDeadline(todo)}
                                {this.crucialTaskTag(todo)}
                              </div>
                              <div className="col-4">
                                 {this.crucialTaskButton(todo)}
                                <button type="submit" className="btn btn-group btn-sm btn-danger m-2 float-right" onClick={this.props.deleteTodo.bind(this, todo.id)}><span><i className="fa fa-trash"></i></span></button> 
                              </div>
                           </div>
                        </div>
                    </div>
                </div>
                ))}
            </React.Fragment>
            )
        }
    }

    
const checkboxDecoration = {
    textDecoration : "line-through" ,
    color: "grey" ,
  }

function mapStateToProps(state){
    return {
        todos: state.todosReducer.todos
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        deleteTodo ,
        toggleCheckbox ,
        toggleCrucialTask 
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Todos)

