import React, { Component } from 'react';
import {productsService} from '../../services/productsPageService/productsPageService';
import axios from "axios/index";

import Product from './components/Product';


export default class ProductsPage extends Component {

    state = {
        products: []
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




    render() {

        const productList = this.state.products.map( prod => {
           console.log(prod);
           return <Product
               name={prod.p_name}/>
        });






        return (
            <div>
                {productList}

                
            </div>


        )
    }
}
