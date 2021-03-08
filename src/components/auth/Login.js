import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link } from 'react-router-dom';
import '../CSS/Login.css';
 
class Login extends Component {
  state = { username: '', password: '' }
 
  service = new AuthService()
 
  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    this.service.login(username, password)
    .then( response => {
        this.setState({ username: "", password: "" });
        this.props.getUser(response);
        this.props.history.push('/');
    })
    .catch( error => console.log(error) )
  }
    
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
    
  render(){
    return(
      <div className="main">
        <form className="form1" onSubmit={this.handleFormSubmit}>
        <p className="sign" align="center">Login</p>
          <label>Username:</label>
          <input className="un" type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>
          <label>Password:</label>
          <input className="pass" type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
          
          <button className="submit" type="submit" value="Login">Login</button>
        </form>
        <p>Don't have an account? 
            <Link to={"/signup"} className=""> Signup</Link>
        </p>
      </div>
    )
  }
}
 
export default Login;