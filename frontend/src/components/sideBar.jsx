import React, { Component } from 'react';
import '../sidebar.css' ;
import { Link } from 'react-router-dom' ;
import { connect } from 'react-redux' ;
import { logout } from '../actions/auth' ;
import PropTypes from 'prop-types' ;


class SideBar extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool ,
        logout: PropTypes.func.isRequired
    }

    render() {
        return (
            <div id="sidebar" className="text-white">
                <h1 className="p-4 sticky-top" id="header">TaskBook</h1>
                <div id="sections"><p className="p-2"><i className="fa fa-home mr-3"></i>Dashboard</p></div>
                
                { this.props.isAuthenticated ?

                    <div id="sections"><p className="p-2"><span><i className="fa fa-sign-out mr-4"></i></span>
                    <a className="text-white" onClick={this.props.logout}>Logout</a>
                    </p></div>

                    :
                    <React.Fragment>
                    <div id="sections"><p className="p-2"><span><i className="fa fa-sign-in mr-4"></i></span>
                        <Link to='/register' className="text-white">Register</Link></p>
                    </div>
                
                    <div id="sections"><p className="p-2"><span><i className="fa fa-sign-in mr-4"></i></span>
                        <Link to='/Login' className="text-white">Login</Link></p>
                    </div>
                    </React.Fragment>
                }     

                <div id="sections"><p className="p-2"><i className="fa fa-address-card mr-3"></i>About</p></div>
            </div>
        )
    }
}

const mapStatetoProps = state => {
    return {
        isAuthenticated: state.auth.token != null
    }
}

export default connect(mapStatetoProps, { logout })(SideBar) ;