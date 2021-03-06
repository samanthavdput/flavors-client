import React, { Component } from 'react';
import axios from 'axios';
import EditCupcake from './EditCupcake';
 
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
          <button onClick={() => this.deleteFlavorlist(this.state._id)}>Delete this Flavorlist</button>
        </div>
      )
    } 
  }
 
  render(){
    return(
      <div>
      <div>{this.renderEditForm()} </div>
        <h1>{this.state.name}</h1>
        <p>{this.state.description}</p>
        <p>{this.state.ingredients}</p>
        <img src={this.state.imageUrl} alt="" />

        <button onClick={() => this.deleteFlavorlist(this.state._id)}>Delete this cupcake</button>
      </div>
    )
  }
}
 
export default CupcakeDetails;