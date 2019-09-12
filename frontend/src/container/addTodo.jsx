import React, {Component} from 'react'
import '../App.css'
import { bindActionCreators } from 'redux' ;
import { connect } from 'react-redux' ;
import { getTodos , addTodo } from '../actions/todos' ;

class AddTodo extends Component {
    state = {
        title : "" ,
        description: "",
        deadline: "00.00" ,
    }

    onChange = (e) => {
        this.setState({
           [e.target.name] : e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        const todoobj = {
            title: this.state.title ,
            description: this.state.description ,
            deadline: this.state.deadline
        }

        this.props.addTodo(todoobj)
        this.props.getTodos()
    }

    render() {
        return (
          <div className="mt-4 ">
            <div className="row justify-content-around cardcontainer">
                <div className="col-8">
                    <div className="card bg-dark my-5">
                    <div className="card-body">
                        <h4 className="card-title text-center text-white my-3 mb-4">Add Todo</h4>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input type="text" className="form-control mb-3" name="title" value={this.state.title} onChange={this.onChange} placeholder="Add a Thing todo---" />
                            </div>
                            <div className="form-group">
                                <input type="time" className="form-control" name="deadline" value={this.state.deadline} onChange={this.onChange} placeholder="Todo..." />
                            </div>
                            <button className="btn btn-lg btn-block btn-info text-uppercase submitbtn mt-3" type="submit">Add Todo</button>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
          </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        todos: state.todosReducer.todos
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addTodo: addTodo ,
        getTodos: getTodos  
    }, dispatch)
}

export default connect(mapStateToProps , mapDispatchToProps)(AddTodo)
