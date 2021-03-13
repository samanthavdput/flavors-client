import React, { Component } from "react";
import axios from "axios";
import "../CSS/Common.css";

class AddFlavorlist extends Component {
  state = {
    title: "",
    description: "",
    status: "",
    imageUrl: "",
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        `${process.env.REACT_APP_FLAVORS_API}/flavorlists`,
        {
          title: this.state.title,
          description: this.state.description,
          imageUrl: this.state.imageUrl,
        },
        { withCredentials: true }
      )
      .then(
        (res) => {
          this.props.getData();
          this.setState({
            title: "",
            description: "",
            status: "",
          });
        },
        (err) => {
          console.log(err);
          this.setState({
            status: "Oops, something went wrong",
          });
        }
      );
  };

  handleFileUpload = (event) => {
    console.log("The file to be uploaded is: ", event.target.files[0]);

    const uploadData = new FormData();
    uploadData.append("imageUrl", event.target.files[0]);

    axios
      .post(`${process.env.REACT_APP_FLAVORS_API}/upload`, uploadData)
      .then((response) => {
        console.log("response from the api: ", response);
        this.setState({ imageUrl: response.data.image_url });
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  toggleForm = () => {
    if (!this.state.isShowing) {
      this.setState({ isShowing: true });
    } else {
      this.setState({ isShowing: false });
    }
  };

  showAddFlavorlistForm = () => {
    if (this.state.isShowing) {
      return (
        <React.Fragment>
          {this.state.status !== "" ? <div>{this.state.status}</div> : null}

          <div className="container">
            <div className="main">
              <form onSubmit={this.handleFormSubmit} className="form1">
                <p className="sign" align="center">
                  Add a new Flavorlist
                </p>
                <label className="sign">Title:</label>
                <input
                  className="un"
                  type="text"
                  name="title"
                  value={this.state.title}
                  onChange={(e) => this.handleChange(e)}
                />

                <label className="sign">Description:</label>
                <textarea
                  className="un"
                  name="description"
                  value={this.state.description}
                  onChange={(e) => this.handleChange(e)}
                />

                <label className="sign">Flavorlist Image:</label>
                <input
                  className="un"
                  type="file"
                  onChange={(e) => this.handleFileUpload(e)}
                />

                <button className="submit" type="submit" value="Submit">
                  Create
                </button>
              </form>
            </div>
          </div>
        </React.Fragment>
      );
    }
  };

  render() {
    return (
      <div>
        <hr />
        <button className="submit" onClick={() => this.toggleForm()}>
          {" "}
          Add Flavorlist{" "}
        </button>
        {this.showAddFlavorlistForm()}
      </div>
    );
  }
}

export default AddFlavorlist;
