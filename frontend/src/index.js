import React from 'react';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';

import { render } from 'react-dom' ;
import { Provider } from 'react-redux' ;
import store from './store' ;

import Login from './components/Login'
import Register from './components/Register'

import { BrowserRouter as Router, Route} from 'react-router-dom' ;
// import PrivateRoute from './components/common/PrivateRoute' ;

render(
    <Provider store={store}>
      <Router>
          <div>
            <Route exact path="/" component={App} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </div>  
      </Router>
    </Provider>,
    document.getElementById('root')
  )