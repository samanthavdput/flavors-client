import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddFlavorlist from './AddFlavorlist';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/Login.css';


class AllFlavorlists extends Component {

    state = {
        allLists: []
    }

    getAllFlavorlists = () => {
        axios.get(`${process.env.REACT_APP_FLAVORS_API}/flavorlists`, {withCredentials:true})
            .then(responseFromApi => {
                this.setState({
                    allLists: responseFromApi.data
                })
            }, err => {
                console.log(err);
            })
    }

    componentDidMount() {
        this.getAllFlavorlists();
    }


    render() {

        const flavorlists = this.state.allLists.map(flavorlist => {
            return (
                <div key={flavorlist._id} className="row col-md-4">
                <div className="card">
                <div className="card-body">
                    <Link to={`/flavorlists/${flavorlist._id}`}>
                        <h4 className="card-title">{flavorlist.title}</h4>
                    </Link>
                    <img src={flavorlist.imageUrl} className="card-img-top" alt="" />
                    <h5 style={{maxWidth: '400px'}} >{flavorlist.description} </h5> 
                  { flavorlist.cupcakes.map((cupcake, index) => {
                    return <li className="un" key={index}>{cupcake.name}</li>
                  }) }  
                </div>
                </div>
            </div>

            )
        })

        return (
            <div className="container-fluid">
                <div className="row">
                    {flavorlists}
                </div>
                <div>
                    <AddFlavorlist getData={() => this.getAllFlavorlists()} />
                </div>
            </div>
        )
    }
}

export default AllFlavorlists;
