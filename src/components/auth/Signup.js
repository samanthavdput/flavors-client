import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link } from 'react-router-dom';
import '../CSS/Login.css';

 
class Signup extends Component {
 
  state = { username: '', password: '' }
 
  service = new AuthService()
 
  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
   
    this.service.signup(username, password)
    .then( response => {
        this.setState({
            username: "", 
            password: "",
        });
        this.props.getUser(response)
        // this.props.history.push('/');
    })
    .catch( error => console.log(error) )
  }
   
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
      
   
  render(){
    return(
      <div className="container">
        <div className="main">
        <p className="sign">Create your account:</p>
        <form className="form1" onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input type="text" className="un" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>
          
          <label>Password:</label>
          <input className="pass" type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
          
          <button className="submit" type="submit" value="Signup">Signup</button>
        </form>
   
        <p>Already have an account? 
            <Link to={"/"}> Login</Link>
        </p>
   
      </div>
    </div>
    )
  }
}
 
export default Signup;