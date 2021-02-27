import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditFlavorlist from './EditFlavorlist';
import AddCupcake from '../cupcakes/AddCupcake';
 
class FlavorlistDetails extends Component {
  state = {}
 
  componentDidMount(){
    this.getSingleFlavorlist();
  }
 
  getSingleFlavorlist = () => {
    const { params } = this.props.match;
    axios.get(`http://localhost:5000/api/flavorlists/${params.id}`, {withCredentials:true})
    .then( responseFromApi =>{
      const theFlavorlist = responseFromApi.data;
      this.setState(theFlavorlist);
    })
    .catch((err)=>{
        console.log(err)
    })
  }
 
  renderEditForm = () => {
    if(!this.state.title){
      this.getSingleFlavorlist();
    } else {                                                                   |
      return <EditFlavorlist theFlavorlist={this.state} getTheFlavorlist={this.getSingleFlavorlist} {...this.props} />
    }
  }

// Delete Flavorlist:
  deleteFlavorlist = () => {
    const { params } = this.props.match;
    axios.delete(`http://localhost:5000/api/flavorlists/${params.id}`, {withCredentials:true})
    .then( () =>{
        this.props.history.push('/flavorlists');        
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  renderAddCupcakeForm = () => {
    if(!this.state.title){
        this.getSingleFlavorlist();
      } else {     
        return <AddCupcake theFlavorlist={this.state} getTheFlavorlist={this.getSingleFlavorlist} />
      }
  }

  ownershipCheck = (flavorlist) => {
    if(this.props.loggedInUser && flavorlist.owner == this.props.loggedInUser._id){
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
        <h1>{this.state.title}</h1>
        <p>{this.state.description}</p>
        <img src={this.state.imageUrl} />
        { this.state.cupcakes && this.state.cupcakes.length > 0 && <h3>Cupcakes</h3> }
        { this.state.cupcakes && this.state.cupcakes.map((cupcake, index) => {
            return(
                <div key={ index }>
                    <Link to={`/flavorlists/${this.state._id}/cupcakes/${cupcake._id}`}> 
                        { cupcake.name }
                    </Link>
                </div>
            )
            
        }) }
        <div>{this.renderEditForm()} </div>
        <button onClick={() => this.deleteFlavorlist()}>Delete this flavorlist</button>
        <br/>
        <div>{this.renderAddCupcakeForm()} </div>
        <br/><br/><br/><br/><br/>
        <Link to={'/flavorlists'}>Back to flavorlists</Link>
      </div>
    )
  }
}
 
export default FlavorlistDetails;