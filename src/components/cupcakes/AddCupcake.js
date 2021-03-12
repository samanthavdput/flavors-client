import React, { Component } from 'react';
import axios from 'axios';
import "../CSS/Login.css";
 
class AddCupcake extends Component {
  state = { name: "", description: "", isShowing: false }
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const name = this.state.name;
    const description = this.state.description;
    const ingredients = this.state.ingredients;
    const imageUrl = this.state.imageUrl;
    const flavorlistID = this.props.theFlavorlist._id;

    axios.post(`${process.env.REACT_APP_FLAVORS_API}/cupcakes`, { name, description, ingredients, imageUrl, flavorlistID })
    .then( () => {
        this.props.getTheFlavorlist();
        this.setState({name: "", description: "", ingredients: "", imageUrl: ""});
    })
    .catch( error => console.log(error) )
  }

  handleFileUpload = (event) => {
    
    console.log("The file to be uploaded is: ", event.target.files[0]);

    const uploadData = new FormData();
    uploadData.append("imageUrl", event.target.files[0]);

    axios.post(`${process.env.REACT_APP_FLAVORS_API}/upload`, uploadData)
      .then(response => {
        // response.image_url --> this must be the same name than the property we receive from the api
        // if it doesn't work, try to console.log response we get from the api ;)
        console.log('response from the api: ', response);
        this.setState({ imageUrl: response.data.image_url });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
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
          <div className="container">
            <div className="main">
                  <h3 className="sign">Add Cupcake</h3>
                  <form onSubmit={this.handleFormSubmit}>
                  <label>Name:</label>
                  <input type="text" name="name" value={this.state.name} onChange={ e => this.handleChange(e)}/>
                  <label>Description:</label>
                  <textarea name="description" value={this.state.description} onChange={ e => this.handleChange(e)} />
                  <label>Ingredients:</label>
                  <textarea name="ingredients" value={this.state.ingredients} onChange={ e => this.handleChange(e)} />
                  <label>Cupcake Image:</label>
                  <input type="file" onChange={ (e) => this.handleFileUpload(e) } />
                  
                  <input className="submit" type="submit" value="Submit" />
                  </form>
            </div>
          </div>
          )
    }
  }
 
  render(){
    return(
      <div>
            <hr />
            <button className="submit" onClick={() => this.toggleForm()}> Add cupcake </button>
            { this.showAddCupcakeForm() }
      </div>
    )
  }
}
 
export default AddCupcake;