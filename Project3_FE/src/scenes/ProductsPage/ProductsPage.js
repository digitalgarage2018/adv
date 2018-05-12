import React, { Component } from "react";
import axios from "axios";

import Product from './components/Product';



export default class ProductsPage extends Component {

    state = {
        products: []
    };




    componentDidMount(){
        axios.get('http://localhost:8091/products/')
            .then( response => {
                    console.log(response.data);
                    this.setState({products: response.data});
                }

            )
            .catch(error => {
                console.log(error)
            });

    }




    render() {

        const prods = this.state.products.map( (product, index) =>
            {
                return <Product
                    name={product.p_name}
                    path={product.p_image}
                    description={product.p_description}
                    relatedservice={product.p_service}
                    price={product.p_price}
                    key={index}/>

            }

        )




        return (
            <span>
            {prods}
            </span>
            );



    }
}


