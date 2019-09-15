import React, { Component } from 'react' ;
import { connect } from 'react-redux' ;
import { authSignup } from '../actions/auth' ;
import { Redirect } from 'react-router-dom' ;
import PropTypes from 'prop-types' ;
 
class Register extends Component{
    static propTypes = {
        isAuthenticated: PropTypes.bool ,
        authSignup: PropTypes.func.isRequired
    }

    constructor(props){
        super(props)
        this.state = {
            username: '' ,
            email: '', 
            password1: '', 
            password2: ''
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
       e.preventDefault() 
       this.props.authSignup(this.state.username, this.state.email, this.state.password1, this.state.password2)
    }

    render(){
        if (this.props.isAuthenticated){
            return <Redirect to="/" />
        }

        let errorMessage = null ;
        if (this.props.error){
            errorMessage = <p>{this.props.error.message}</p>
        }

        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <h2 className="text-center">Register</h2>
                    { errorMessage }
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" name="username" onChange={this.onChange} value={this.state.username}/>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" name="email" onChange={this.onChange} value={this.state.email}/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" name="password1" onChange={this.onChange} value={this.state.password1}/>
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="password" className="form-control" name="password2" onChange={this.onChange} value={this.state.password2}/>
                        </div>
                        <button type="submit" className="btn btn-block btn-primary">Submit</button>
                    </form>   
                </div>

            </div> 
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token != null ,
        error: state.auth.error
    }
}

export default connect(mapStateToProps, { authSignup })(Register)