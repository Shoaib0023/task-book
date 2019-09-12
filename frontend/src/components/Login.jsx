import React, { Component } from 'react' ;
import store from '../store' ;
import { loadUser, login } from '../actions/auth' ;
import { Link, Redirect } from 'react-router-dom' ;
import { connect } from 'react-redux' ;
import PropTypes from 'prop-types' ;
 
class Login extends Component{
    componentDidMount(){
        store.dispatch(loadUser())
    }

    static propTypes = {
        isAuthenticated:  PropTypes.bool,
        login: PropTypes.func.isRequired
    }

    constructor(props){
        super(props)
        this.state = {
            username: '' ,
            password: ''
        }
    }


    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault() ;
        this.props.login(this.state.username, this.state.password) ;
    } ;

    render(){
        if (this.props.isAuthenticated) {
            return <Redirect to='/' /> ;
        }
        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <h2 className="text-center">Login</h2>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" name="username" onChange={this.onChange} value={this.state.username}/>
                        </div>
    
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" name="password" onChange={this.onChange} value={this.state.password}/>
                        </div>
                       <button type="submit" className="btn btn-primary m-2">Login</button>
                       <p>Don't have an account <Link to='/register'>Register</Link></p>
                    </form>   
                </div>

            </div> 
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, {login})(Login)