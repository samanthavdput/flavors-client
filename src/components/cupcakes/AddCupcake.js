import React, { Component } from 'react';
import axios from 'axios';
 
class AddCupcake extends Component {
  state = { name: "", description: "", isShowing: false }
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const name = this.state.name;
    const description = this.state.description;
    const flavorlistID = this.props.theFlavorlist._id;

    axios.post(`${process.env.REACT_APP_FLAVORS_API}/cupcakes`, { name, description, flavorlistID })
    .then( () => {
        this.props.getTheFlavorlist();
        this.setState({name: "", description: ""});
    })
    .catch( error => console.log(error) )
  }
 
  handleChange = (event) => {  
      const {name, value} = event.target;
      this.setState({[name]: value});
  }
 
  toggleForm = () => {
      if(!this.state.isShowing){
          this.setState({isShowing: true});
      } else {
        this.setState({isShowing: false});
      }
  }
 
  showAddCupcakeForm = () => {
    if(this.state.isShowing){
        return(
            <div>
                  <h3>Add Cupcake</h3>
                  <form onSubmit={this.handleFormSubmit}>
                  <label>Name:</label>
                  <input type="text" name="name" value={this.state.name} onChange={ e => this.handleChange(e)}/>
                  <label>Description:</label>
                  <textarea name="description" value={this.state.description} onChange={ e => this.handleChange(e)} />
                  
                  <input type="submit" value="Submit" />
                  </form>
            </div>
          )
    }
  }
 
  render(){
    return(
      <div>
            <hr />
            <button onClick={() => this.toggleForm()}> Add cupcake </button>
            { this.showAddCupcakeForm() }
      </div>
    )
  }
}
 
export default AddCupcake;