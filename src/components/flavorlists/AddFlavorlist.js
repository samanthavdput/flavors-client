import React, { Component } from 'react';
import axios from 'axios';
 
class AddFlavorlist extends Component {
  state = { 
      title: "", 
      description: "",
      status: "",
      imageUrl: ""
    }
   
  handleFormSubmit = (event) => {
    event.preventDefault();

    axios.post(`${process.env.FLAVORS_API}/flavorlists`, {
        title: this.state.title,
        description: this.state.description,
        imageUrl: this.state.imageUrl
    }, {withCredentials:true})
    .then( (res) => {
        this.props.getData();
        this.setState({
            title: "",
            description: "",
            status: "Your project was created"
        });
    }, (err) => {
        console.log(err);
        this.setState({
            status: "Oops, something went wrong"
        });
    });
  }

  handleFileUpload = (event) => {
    
    console.log("The file to be uploaded is: ", event.target.files[0]);

    const uploadData = new FormData();
    uploadData.append("imageUrl", event.target.files[0]);

    axios.post(`${process.env.FLAVORS_API}/upload`, uploadData)
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
 
  render(){
    return(
      <React.Fragment>

        { this.state.status !== '' ? <div>{this.state.status}</div> : null }

        <form onSubmit={this.handleFormSubmit}>
          <label>Title:</label>
          <input type="text" name="title" value={this.state.title} onChange={ e => this.handleChange(e)}/>
          
          <label>Description:</label>
          <textarea name="description" value={this.state.description} onChange={ e => this.handleChange(e)} />
          
          <label>Flavorlist Image:</label>
          <input type="file" onChange={ (e) => this.handleFileUpload(e) } />

          <input type="submit" value="Submit" />
        </form>
      </React.Fragment>
    )
  }
}

export default AddFlavorlist;
