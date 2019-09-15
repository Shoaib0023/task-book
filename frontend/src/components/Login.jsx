import React, { Component } from 'react' ;
import { Link, Redirect } from 'react-router-dom' ;
import { connect } from 'react-redux' ;
import PropTypes from 'prop-types' ;
import { authLogin } from '../actions/auth' ; 

class Login extends Component{
    static propTypes = {
        isAuthenticated:  PropTypes.bool,
        authLogin: PropTypes.func.isRequired
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
        this.props.authLogin(this.state.username, this.state.password) ;
    } ;

    render(){
        if (this.props.isAuthenticated) {
            return <Redirect to='/' /> ;
        }

        let errorMessage = null ;
        if (this.props.error){
            errorMessage = <p>{this.props.error.message}</p>
        }

        return (          
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <h2 className="text-center">Login</h2>
                    { errorMessage }
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
        isAuthenticated: state.auth.token != null ,
        error: state.auth.error
    }
}


export default connect(mapStateToProps, { authLogin })(Login)