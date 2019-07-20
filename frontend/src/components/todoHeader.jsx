import React, { Component } from 'react' ;
import '../App.css' ;

export default class TodoHeader extends Component {
    
    totalTodos = () => {
        let count = 0
        this.props.todos.map(todo => {
            count = count + 1
        })
        return count
    }

    doneTodos = () => {
        let count = 0
        this.props.todos.map(todo => {
            if(todo.completed == true){
                count = count + 1
            }
        })
        return count
    }
    
    undoneTodos = () => {
        let count = 0
        this.props.todos.map(todo => {
            if(todo.completed == false){
                count = count + 1
            }
        })
        return count
    }

    crucialTodos = () => {
        let count = 0
        this.props.todos.map(todo => {
            if(todo.crucial == true){
                count = count + 1
            }
        })
        return count
    }

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    
                </div>

                <div className="row p-2 mt-5 mb-5 stats-bar sticky-top justify-content-around">   
                    <div className="col-2 stats-border">
                        <h1 id="stats">
                            { this.totalTodos() }
                        </h1>
                        <p className="text-secondary">Total Tasks</p>
                    </div>
                    <div className="col-2 stats-border">
                        <h1 id="stats">
                            { this.doneTodos() }
                        </h1>
                        <p className="text-secondary">Done Tasks</p>
                    </div>
                <div className="col-2 stats-border">
                        <h1 id="stats">
                            { this.undoneTodos() }
                        </h1>
                        <p className="text-secondary">Undone Tasks</p>
                    </div>
                <div className="col-2 stats-border">
                        <h1 id="stats">
                            { this.crucialTodos() }
                        </h1>
                        <p className="text-secondary">Crucial Tasks</p>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
