import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EditFlavorlist from "./EditFlavorlist";
import AddCupcake from "../cupcakes/AddCupcake";
import "../CSS/Common.css";

class FlavorlistDetails extends Component {
  state = {};

  componentDidMount() {
    this.getSingleFlavorlist();
  }

  getSingleFlavorlist = () => {
    const { params } = this.props.match;
    axios
      .get(`${process.env.REACT_APP_FLAVORS_API}/flavorlists/${params.id}`, {
        withCredentials: true,
      })
      .then((responseFromApi) => {
        const theFlavorlist = responseFromApi.data;
        this.setState(theFlavorlist);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderEditForm = () => {
    if (!this.state.title) {
      this.getSingleFlavorlist();
    } else {
      return (
        <EditFlavorlist
          theFlavorlist={this.state}
          getTheFlavorlist={this.getSingleFlavorlist}
          {...this.props}
        />
      );
    }
  };

  // Delete Flavorlist:
  deleteFlavorlist = () => {
    const { params } = this.props.match;
    axios
      .delete(`${process.env.REACT_APP_FLAVORS_API}/flavorlists/${params.id}`, {
        withCredentials: true,
      })
      .then(() => {
        this.props.history.push("/flavorlists");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderAddCupcakeForm = () => {
    if (!this.state.title) {
      this.getSingleFlavorlist();
    } else {
      return (
        <AddCupcake
          theFlavorlist={this.state}
          getTheFlavorlist={this.getSingleFlavorlist}
        />
      );
    }
  };

  ownershipCheck = (flavorlist) => {
    if (
      this.props.loggedInUser &&
      flavorlist.owner === this.props.loggedInUser._id
    ) {
      return (
        <div>
          <div>{this.renderEditForm()} </div>
          <button className="submit" onClick={() => this.deleteFlavorlist(this.state._id)}>
            Delete this Flavorlist
          </button>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <h1 className="card-title">{this.state.title}</h1>
        {/* <p>{this.state.description}</p> */}
        <div className="row ">
          {this.state.cupcakes && this.state.cupcakes.length > 0 && <p></p>}
          {this.state.cupcakes &&
            this.state.cupcakes.map((cupcake, index) => {
              return (
                <div key={index} className="col-md-4">
                  <div className="card" style={{ borderRadius: "20%" }}>
                    <div className="card-body">
                      <Link
                        to={`/flavorlists/${this.state._id}/cupcakes/${cupcake._id}`}
                      >
                        <h3 className="card-title">{cupcake.name}</h3>
                        <img
                          src={cupcake.imageUrl}
                          className="card-img-top"
                          alt=""
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div >
        {this.ownershipCheck(this.state)}
      </div>
        <div>{this.renderAddCupcakeForm()} </div>
      </div>
    );
  }
}

export default FlavorlistDetails;