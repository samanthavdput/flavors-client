import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../auth/auth-service';
 
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
        <nav className="nav-style">
            <p>Welcome, {this.state.loggedInUser.username}</p>
            <Link to='/flavorlists' style={{ textDecoration: 'none' }}>Flavorlists</Link>
              <Link to='/'>
                <button onClick={() => this.logoutUser()}>Logout</button>
              </Link>
        </nav>
      )
    } else {
      return ( 
        <nav className="nav-style">
            <p><Link to='/' style={{ textDecoration: 'none' }}>Login</Link></p>
            <p><Link to='/signup' style={{ textDecoration: 'none' }}>Signup</Link></p>
        </nav>
      )
    }
  }
}
 
export default Navbar;