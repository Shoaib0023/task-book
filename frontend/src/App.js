import React, {Component} from 'react';

import './App.css';
import AddTodo from './container/addTodo'
import SideBar from './components/sideBar'
import TodoHeader from './container/todoHeader'
import Todos from './container/todos'

// import Alerts from './components/Alerts' ;

import { connect } from 'react-redux' ;
import PropTypes from 'prop-types' ;
import { getTodos } from './actions/todos';
import { loadUser } from './actions/auth' ;
import store from './store'
// axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
// axios.defaults.xsrfCookieName = "XCSRF-TOKEN";


class App extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    getTodos: PropTypes.func.isRequired
  };

  componentDidMount(){
     // Action for fetching all Todos
    this.props.getTodos() ;
  }

  render(){
    return (
        <div className="row" id="section">
          <div className="col-lg-2 col-md-12 pr-0">
              <SideBar />
          </div>

          <div className="col-lg-7 col-md-12" id="todos">
            <TodoHeader />
            <Todos />
          </div>
            
          <div className="col-lg-3 col-md-12 p-0 bg-dark" id="addtodo">
              <AddTodo />
          </div>
          </div>
      
     )
   }
 };


function mapStateToProps(state){
  return {
      todos: state.todosReducer.todos ,
      isAuthenticated: state.todosReducer.isAuthenticated 
  }
}

export default connect(mapStateToProps, { getTodos })(App)