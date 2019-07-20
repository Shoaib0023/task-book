import React, { Component } from 'react';
import '../sidebar.css' ;


export default class SideBar extends Component {
    render() {
        return (
            <div id="sidebar" className="text-white">
                <h1 className="p-4 sticky-top" id="header">TaskBook</h1>
                <div id="sections"><p className="p-2"><i className="fa fa-home mr-3"></i>Dashboard</p></div>
                <div id="sections"><p className="p-2"><span><i className="fa fa-bolt mr-4"></i></span>Weather</p></div>
                <div id="sections"><p className="p-2"><i className="fa fa-address-card mr-3"></i>About</p></div>
            </div>
        )
    }
}
