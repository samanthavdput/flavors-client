import React, { Component } from 'react';
import axios from 'axios';
 
 
class CupcakeDetails extends Component {
  state = {}
 
  componentDidMount(){
    this.getTheCupcake();
  }
 
  getTheCupcake = () => {
    const { params } = this.props.match;
    axios.get(`${process.env.FLAVORS_API}/flavorlists/${params.id}/cupcakes/${params.cupcakeId}`)
    .then( responseFromApi =>{
      const theCupcake = responseFromApi.data;
      this.setState(theCupcake);
    })
    .catch((err)=>{
        console.log(err)
    })
  }
 
  render(){
    return(
      <div>
        <h1>{this.state.name}</h1>
        <p>{this.state.description}</p>
      </div>
    )
  }
}
 
export default CupcakeDetails;