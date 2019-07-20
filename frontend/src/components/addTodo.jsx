import React, {Component} from 'react' 
import '../App.css'

class AddTodo extends Component {
    state = {
        title : "" ,
        description: "", 
        deadline: "00.00" ,
    }

    addTodo = (e) => {
        this.setState({
           [e.target.name] : e.target.value 
        })
    }

    onSubmit = (e)=> {
        e.preventDefault() ;
        const todoobj = {
            title: this.state.title ,
            description: this.state.description ,
            deadline: this.state.deadline
        }
        
        this.props.addTodo(todoobj)
        this.setState({
            title: '', 
            description: '',
            deadline: ''
        })
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
                                    </div>
                                        <input type="text" className="form-control mb-3" name="title" value={this.state.title} onChange={this.addTodo} placeholder="Add a Thing todo---" />
                                    <div className="form-group">
                                        <input type="time" className="form-control" name="deadline" value={this.state.deadline} onChange={this.addTodo} placeholder="Todo..." />                    
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

export default AddTodo

