import React, { Component } from 'react';
import axios from 'axios';
import EditCupcake from './EditCupcake';
import "../CSS/Login.css";
 
class CupcakeDetails extends Component {
  state = {}
 
  componentDidMount(){
    this.getTheCupcake();
  }
 
  getTheCupcake = () => {
    const { params } = this.props.match;
    axios.get(`${process.env.REACT_APP_FLAVORS_API}/flavorlists/${params.id}/cupcakes/${params.cupcakeId}`, {withCredentials:true})
    .then( responseFromApi =>{
      const theCupcake = responseFromApi.data;
      this.setState(theCupcake);
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  renderEditForm = () => {
    if(!this.state.name){
      this.getTheCupcake();
    } else {                                                                   
      return <EditCupcake theCupcake={this.state} getTheCupcake={this.getTheCupcake} {...this.props} />
    }
  }

  deleteCupcake = () => {
    const { params } = this.props.match;
    axios.delete(`${process.env.REACT_APP_FLAVORS_API}/flavorlists/${params.id}/cupcakes/${params.cupcakeId}`, {withCredentials:true})
    .then( () =>{
        this.props.history.push(`/flavorlists/${params.id}`);        
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  ownershipCheck = (cupcake) => {
    if(this.props.loggedInUser && cupcake.owner === this.props.loggedInUser._id){
      return (
        <div>
          <div>{this.renderEditForm()} </div>
          <button onClick={() => this.deleteCupcake(this.state._id)}>Delete this cupcake</button>
        </div>
      )
    } 
  }
 
  render(){
    return(
      <div>
      <div className='card'style={{width:'22rem'}}>
        <div className="card-body">
        <h1 className="card-title">{this.state.name}</h1>
        <img className="card-img-top" src={this.state.imageUrl} alt="" />
        <p className="card-text" style={{color:'#e4bcd7'}}>{this.state.description}</p>
        <p className="card-text" style={{color:'#e4bcd7'}}>{this.state.ingredients}</p>
        <button className="submit" onClick={() => this.deleteCupcake(this.state._id)}>Delete this cupcake</button>
        </div>
        </div>
        <hr></hr>
        <div>{this.renderEditForm()} </div>
      </div>
    )
  }
}
 
export default CupcakeDetails;