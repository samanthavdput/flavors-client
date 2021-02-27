import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Signup from './components/auth/Signup';
import AuthService from './components/auth/auth-service';
import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/protected-route';
import AllFlavorlists from './components/flavorlists/AllFlavorlists';
import FlavorlistDetails from './components/flavorlists/FlavorlistDetails';
import CupcakeDetails from './components/cupcakes/CupcakeDetails';
 

class App extends Component {
  state = { loggedInUser: null }
 
  service = new AuthService()
 
  fetchUser(){
    if( this.state.loggedInUser === null ){
      this.service.loggedin()
      .then(response =>{
        this.setState({
          loggedInUser:  response
        }) 
      })
      .catch( err =>{
        this.setState({
          loggedInUser:  false
        }) 
      })
    }
  }
 
  getTheUser= (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }
 
  render() {
    {this.fetchUser()}
    if(this.state.loggedInUser){
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} getUser={this.getTheUser} />
          <Switch>
            <ProtectedRoute user={this.state.loggedInUser} path='/flavorlists/:id' component={FlavorlistDetails} />
            <ProtectedRoute user={this.state.loggedInUser} path='/flavorlists' component={AllFlavorlists} />
            <ProtectedRoute user={this.state.loggedInUser} exact path="/flavorlists/:id/cupcakes/:cupcakeId" component={CupcakeDetails} />
          </Switch>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} getUser={this.getTheUser} />
            <Switch> 
              <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser}/>}/>
              <Route exact path='/' render={() => <Login getUser={this.getTheUser}/>}/>
              <ProtectedRoute user={this.state.loggedInUser} path='/flavorlists/:id' component={FlavorlistDetails} />
              <ProtectedRoute user={this.state.loggedInUser} path='/flavorlists' component={AllFlavorlists} />
            </Switch>
        </div>
      );
    }
  }
}

export default App;