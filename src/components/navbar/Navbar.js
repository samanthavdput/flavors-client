import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../auth/auth-service';
import '../CSS/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../CSS/Navbar.css";
 
class Navbar extends Component {
  state = { loggedInUser: null }
 
  service = new AuthService()
 
  componentWillReceiveProps(nextProps) {
    this.setState({...this.state, loggedInUser: nextProps["userInSession"]});
  }
 
  logoutUser = () =>{
    this.service.logout()
    .then(() => {
      this.setState({ loggedInUser: null });
      this.props.getUser(null);  
    })
  }
 
  render(){
    if(this.state.loggedInUser){
      return(
        <nav className="navbar navbar-light" style={{backgroundColor: "#FFFFFF", height: "3em", marginBottom: "10px"}}>
            <h5>Welcome, {this.state.loggedInUser.username}</h5>
            <Link to='/flavorlists' style={{ textDecoration: 'none' }}>Flavorlists</Link>
              <Link to='/'>
                <button onClick={() => this.logoutUser()} className="submit">Logout</button>
              </Link>
        </nav>
      )
    } else {
      return ( 
        <nav className="navbar navbar-light" style={{backgroundColor: "#FFFFFF", height: "3em", marginBottom: "-40px"}}>
            <p><Link to='/login' style={{ textDecoration: 'none' }}>Login</Link></p>
            <p><Link to='/signup' style={{ textDecoration: 'none' }}>Signup</Link></p>
        </nav>
      )
    }
  }
}
 
export default Navbar;