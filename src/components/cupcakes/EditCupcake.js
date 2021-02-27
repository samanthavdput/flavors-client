import React, { Component } from 'react';
import axios from 'axios';
 
class EditCupcake extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.theCupcake.name,
            description: this.props.theCupcake.description
        }
    }
  
  handleFormSubmit = (event) => {
    event.preventDefault();

    const name = this.state.name;
    const description = this.state.description;
 
    axios.put(`${process.env.FLAVORS_API}/flavorlists/${this.props.theFlavorlist._id}/cupcakes/${this.props.theCupcake._id}`, { name, description }, {withCredentials:true})
    .then( () => {
        this.props.history.push('/');    
    }, error => {
        console.log(error)
    })
  }
 
  handleChangeName = (event) => {  
    this.setState({
      name:event.target.value
    })
  }
 
  handleChangeDesc = (event) => {  
    this.setState({
      description:event.target.value
    })
  }
 
  render(){
    return (
      <div>
        <hr />
        <h3>Edit this Cupcake:</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Name:</label>
          <input type="text" name="name" value={this.state.name} onChange={e => this.handleChangeName(e)}/>
          
          <label>Description:</label>
          <textarea name="description" value={this.state.description} onChange={e => this.handleChangeDesc(e)} />
          
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}
 
export default EditCupcake;