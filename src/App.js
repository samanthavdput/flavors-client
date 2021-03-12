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
import Header from './components/Header';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
 

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

  componentDidMount(){
    this.fetchUser();
  }
 
  render() {

    if(this.state.loggedInUser){
      return (
        <div className="App">
        <Navbar userInSession={this.state.loggedInUser} getUser={this.getTheUser} />
          {/* <Header/> */}
          <Route exact path='/' render={() => <AllFlavorlists/>}/>
          <Switch>
            
            <ProtectedRoute user={this.state.loggedInUser} exact path='/flavorlists' component={AllFlavorlists} />
            <ProtectedRoute user={this.state.loggedInUser} exact path='/flavorlists/:id' component={FlavorlistDetails} />
            <ProtectedRoute user={this.state.loggedInUser} exact path="/flavorlists/:id/cupcakes/:cupcakeId" component={CupcakeDetails} />
          </Switch>
          <div className="FooterWrap">
            <Footer style={{position: "absolute", bottom: "0", width: "100%", height: "2,5rem"}}/>
          </div>
        </div>
      );
    } else {
      return (
        <div className="App">
        <Navbar userInSession={this.state.loggedInUser} getUser={this.getTheUser} />
        {/* <Header/> */}
            <Switch> 
            <Route exact path='/' render={() => <Header/>}/>
              <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser}/>}/>
              <Route exact path='/login' render={() => <Login getUser={this.getTheUser}/>}/>
              <ProtectedRoute user={this.state.loggedInUser} exact path='/flavorlists' component={AllFlavorlists} />
              <ProtectedRoute user={this.state.loggedInUser} exact path='/flavorlists/:id' component={FlavorlistDetails} />
              <ProtectedRoute user={this.state.loggedInUser} exact path="/flavorlists/:id/cupcakes/:cupcakeId" component={CupcakeDetails} />
            </Switch>
            <div className="FooterWrap">
            <Footer style={{position: "absolute", bottom: "0", width: "100%", height: "2,5rem"}}/>
            </div>
        </div>
      );
    }
  }
}

export default App;