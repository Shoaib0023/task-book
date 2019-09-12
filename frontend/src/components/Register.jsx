import React, { Component } from 'react' ;

class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: '' ,
            email: '', 
            password: '', 
            password2: ''
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        console.log("Submitted...")
    }

    render(){
        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <h2 className="text-center">Register</h2>
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
                            <input type="password" className="form-control" name="password" onChange={this.onChange} value={this.state.password}/>
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

export default Register