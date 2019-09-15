import axios from 'axios' ;
import React, {Component} from 'react';

import './App.css';
import AddTodo from './container/addTodo'
import SideBar from './components/sideBar'
import TodoHeader from './container/todoHeader'
import Todos from './container/todos'

import { connect } from 'react-redux' ;
import PropTypes from 'prop-types' ;
import { getTodos } from './actions/todos';
import store from './store' ;

import { Redirect } from 'react-router-dom' ;

import { authCheckState } from './actions/auth'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";


class App extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount(){
    store.dispatch(authCheckState()) ;
        
    this.props.getTodos() ;
  }

  render(){
        if (!this.props.isAuthenticated) {
          return <Redirect to='/login' /> ;
        }
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
      isAuthenticated: state.auth.token != null 
  }
}

export default connect(mapStateToProps, { getTodos })(App)