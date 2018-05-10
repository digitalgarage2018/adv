import React, { Component } from 'react';
import {productsService} from '../../services/productsPageService/productsPageService';
import axios from "axios/index";

import Product from './components/Product';


export default class ProductsPage extends Component {

    state = {
        products: []
    }

    constructor() {
        super();
        this.catchOutput = this.catchOutput.bind(this);
        
    }

    componentDidMount(){
        axios.get('http://localhost:8091/products/')
            .then( response => {
                    this.setState({products: response.data});
                    console.log(this.state.products);
                }
            )
            .catch(function (error) {
                console.log(error);
            });

    }


    catchOutput(e) {
        console.log(e.target.value);
        this.setState({
            showOutput: e.target.value
        })
    }


    render() {



        return (
            <div>
                <h1> sono SUI PRODOTTI  </h1>

                
            </div>


        )
    }
}
