import React, { Component } from 'react';
import axios from 'axios';
import EditCupcake from './EditCupcake';
import { Link } from 'react-router-dom';
 
 
class CupcakeDetails extends Component {
  state = {}
 
  componentDidMount(){
    this.getTheCupcake();
  }
 
  getTheCupcake = () => {
    const { params } = this.props.match;
    axios.get(`http://localhost:5000/api/flavorlists/${params.id}/cupcakes/${params.cupcakeId}`)
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
    } else {                                                                  |
      return <EditCupcake theCupcake={this.state} getTheCupcake={this.getTheCupcake} {...this.props} />
    }
  }
 

  deleteCupcake = () => {
    const { params } = this.props.match;
    axios.delete(`http://localhost:5000/api/flavorlists/${params.id}/cupcakes/${params.cupcakeId}`, {withCredentials:true})
    .then( () =>{
        this.props.history.push('/flavorlists/cupcakes');       
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  ownershipCheck = (project) => {
    if(this.props.loggedInUser && project.owner == this.props.loggedInUser._id){
      return (
        <div>
          <div>{this.renderEditForm()} </div>
          <button onClick={() => this.deleteCupcake(this.state._id)}>Delete cupcake</button>
        </div>
      )
    } 
  }
 
//   render(){
//     return(
//       <div>
//         <h1>{this.state.name}</h1>
//         <p>{this.state.description}</p>
//       </div>
//     )
//   }
//   <div>{this.renderEditForm()} </div>
//   <button onClick={() => this.deleteProject()}>Delete project</button>
//   <br/>
//   <div>{this.renderAddTaskForm()} </div>
//   <br/><br/><br/><br/><br/>
//   <Link to={'/projects'}>Back to projects</Link>
// </div>
// }

render(){
    return(
      <div>
        <h1>{this.state.name}</h1>
        <p>{this.state.description}</p>
        <div>{this.renderEditForm()} </div>
        <button onClick={() => this.deleteCupcake()}>Delete cupcake</button>
        <br/>
        <div>{this.renderAddCupcakeForm()} </div>
        <br/><br/><br/><br/><br/>
        <Link to={'/flavorlists'}>Back to flavorlists</Link>
    </div>
            )
        }
    }


export default CupcakeDetails;