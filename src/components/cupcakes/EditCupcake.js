import React, { Component } from "react";
import axios from "axios";

class EditCupcake extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.theCupcake.name,
      description: this.props.theCupcake.description,
      ingredients: this.props.theCupcake.ingredients,
    };
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    const name = this.state.name;
    const description = this.state.description;
    const ingredients = this.state.ingredients;

    // const flavourlistId = this.props.theFlavorlist._id;
    const flavorlistId = this.props.match.params.id;
    const cupcakeId = this.props.match.params.cupcakeId;

    axios
      .put(
        `${process.env.REACT_APP_FLAVORS_API}/flavorlists/${flavorlistId}/cupcakes/${cupcakeId}`,
        { name, description, ingredients },
        { withCredentials: true }
      )
      .then(
        () => {
          this.props.history.push(`/flavorlists/${flavorlistId}`);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  handleChangeName = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleChangeDesc = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  handleChangeIng = (event) => {
    this.setState({
      ingredients: event.target.value,
    });
  };

  toggleForm = () => {
    if (!this.state.isShowing) {
      this.setState({ isShowing: true });
    } else {
      this.setState({ isShowing: false });
    }
  };

  showEditCupcakeForm = () => {
    if (this.state.isShowing) {
      return (
        <div className="container">
          <div className="main">
            <hr />
            <h3 className="sign">Edit this Cupcake:</h3>
            <form className="form1" onSubmit={this.handleFormSubmit}>
              <label className="sign">Name:</label>
              <input
                className="un"
                type="text"
                name="name"
                value={this.state.name}
                onChange={(e) => this.handleChangeName(e)}
              />

              <label className="sign">Description:</label>
              <textarea
                className="un"
                name="description"
                value={this.state.description}
                onChange={(e) => this.handleChangeDesc(e)}
              />

              <label className="sign">Ingredients:</label>
              <textarea
                className="un"
                name="ingredients"
                value={this.state.ingredients}
                onChange={(e) => this.handleChangeIng(e)}
              />

              <input className="submit" type="submit" value="Submit" />
            </form>
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <button className="submit" onClick={() => this.toggleForm()}>
          {" "}
          Edit cupcake{" "}
        </button>
        {this.showEditCupcakeForm()}
      </div>
    );
  }
}

export default EditCupcake;
