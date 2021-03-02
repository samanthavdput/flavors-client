import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import AddFlavorlist from './AddFlavorlist';
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
                <div key={flavorlist._id}>
                    <Link to={`/flavorlists/${flavorlist._id}`}>
                        <h4>{flavorlist.title}</h4>
                    </Link>
                    <h5 style={{maxWidth: '400px'}} >{flavorlist.description} </h5> 
                  { flavorlist.cupcakes.map((cupcake, index) => {
                    return <li key={index}>{cupcake.name}</li>
                  }) }  
                </div>
            )
        })

        return (
            <div>
                <div>
                    {flavorlists}
                </div>
                <div>
                    <hr />
                    <AddFlavorlist getData={() => this.getAllFlavorlists()} />
                </div>
            </div>
        )
    }
}

export default AllFlavorlists;