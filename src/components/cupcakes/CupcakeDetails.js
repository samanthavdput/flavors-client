import React, { Component, Link } from "react";
import axios from "axios";
import EditCupcake from "./EditCupcake";
import "../CSS/Common.css";

class CupcakeDetails extends Component {
  state = {};

  componentDidMount() {
    this.getTheCupcake();
  }

  getTheCupcake = () => {
    const { params } = this.props.match;
    axios
      .get(
        `${process.env.REACT_APP_FLAVORS_API}/flavorlists/${params.id}/cupcakes/${params.cupcakeId}`,
        { withCredentials: true }
      )
      .then((responseFromApi) => {
        const theCupcake = responseFromApi.data;
        this.setState(theCupcake);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderEditForm = () => {
    if (!this.state.name) {
      this.getTheCupcake();
    } else {
      return (
        <EditCupcake
          theCupcake={this.state}
          getTheCupcake={this.getTheCupcake}
          {...this.props}
        />
      );
    }
  };

  deleteCupcake = () => {
    const { params } = this.props.match;
    axios
      .delete(
        `${process.env.REACT_APP_FLAVORS_API}/flavorlists/${params.id}/cupcakes/${params.cupcakeId}`,
        { withCredentials: true }
      )
      .then(() => {
        this.props.history.push(`/flavorlists/${params.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  ownershipCheck = (cupcake) => {
    if (
      this.props.loggedInUser &&
      cupcake.owner === this.props.loggedInUser._id
    ) {
      return (
        <div>
          <div>{this.renderEditForm()} </div>
          <button onClick={() => this.deleteCupcake(this.state._id)}>
            Delete this cupcake
          </button>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <div
          className="card"
          style={{ borderRadius: "30%", backgroundColor: "#dcf2f0" }}
        >
          <div className="card-body">
            <h3 className="card-title">{this.state.name}</h3>
            <img className="card-img-top" src={this.state.imageUrl} alt="" />
            <h5>Ingredients</h5>
            <p className="card-text" style={{ color: "#e4bcd7" }}>
              {this.state.ingredients}
            </p>
            <h5>Recipe</h5>
            <p className="card-text" style={{ color: "#e4bcd7" }}>
              {this.state.description}
            </p>
            <button
              className="submit"
              onClick={() => this.deleteCupcake(this.state._id)}
            >
              Delete this cupcake
            </button>
            <div>{this.renderEditForm()} </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CupcakeDetails;
