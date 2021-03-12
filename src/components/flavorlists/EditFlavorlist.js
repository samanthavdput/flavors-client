import React, { Component } from 'react';
import axios from 'axios';
import "../CSS/Login.css";
 
class EditFlavorlist extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.theFlavorlist.title,
            description: this.props.theFlavorlist.description
        }
    }
  
  handleFormSubmit = (event) => {
    event.preventDefault();

    const title = this.state.title;
    const description = this.state.description;
 
    axios.put(`${process.env.REACT_APP_FLAVORS_API}/flavorlists/${this.props.theFlavorlist._id}`, { title, description }, {withCredentials:true})
    .then( () => {
        this.props.history.push('/');    
    }, error => {
        console.log(error)
    })
  }
 
  handleChangeTitle = (event) => {  
    this.setState({
      title:event.target.value
    })
  }
 
  handleChangeDesc = (event) => {  
    this.setState({
      description:event.target.value
    })
  }

//   toggleForm = () => {
//     if(!this.state.isShowing){
//         this.setState({isShowing: true});
//     } else {
//       this.setState({isShowing: false});
//     }
// }

// showEditFlavorlistForm = () => {
//   if(this.state.isShowing){
//       return(
//           <div className="container">
//           <div className="main">
//             <hr />
//             <h3 className="sign">Edit this Flavorlist:</h3>
//             <button className="submit" onClick={() => this.toggleForm()}> Edit Flavorlist </button>
//             <form className="form1" onSubmit={this.handleFormSubmit}>
//               <label className="sign">Title:</label>
//               <input className="un" align="center" type="text" name="title" value={this.state.title} onChange={e => this.handleChangeTitle(e)}/>
              
//               <label className="sign">Description:</label>
//               <textarea className="un" align="center" name="description" value={this.state.description} onChange={e => this.handleChangeDesc(e)} />
              
//               <input className="submit" type="submit" value="Submit" />
//             </form>
//           </div>
//         </div>
//         )
//       }
//     }

// render(){
//   return(
//     <div>
//           <hr />
//           <button className="submit" onClick={() => this.toggleForm()}> Edit Flavorlist </button>
//           { this.showEditFlavorlistForm() }
//     </div>
//   )
// }
// }
 
  render(){
    return (
      <div className="container">
      <div className="main">
        <hr />
        <h3 className="sign">Edit this Flavorlist:</h3>
        <button className="submit" onClick={() => this.toggleForm()}> Edit Flavorlist </button>
        <form className="form1" onSubmit={this.handleFormSubmit}>
          <label className="sign">Title:</label>
          <input className="un" align="center" type="text" name="title" value={this.state.title} onChange={e => this.handleChangeTitle(e)}/>
          
          <label className="sign">Description:</label>
          <textarea className="un" align="center" name="description" value={this.state.description} onChange={e => this.handleChangeDesc(e)} />
          
          <input className="submit" type="submit" value="Submit" />
        </form>
      </div>
    </div>
    )
  }
}
 
export default EditFlavorlist;