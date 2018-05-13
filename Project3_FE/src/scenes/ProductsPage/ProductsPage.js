import React, { Component } from "react";
import axios from "axios";

import './ProductsPage.css';
import Product from './components/Product';
import ProductModal from './components/ProductModal';




export default class ProductsPage extends Component {

    state = {
        products: [],
        productSelectedName: "",
        productSelectedDescription: "",
        productSelectedService: "",
        productSelectedPrice: "",
        showModal: false

    };

    showDetailsHandler(product, index) {


        const productSelected = this.state.products[index];
        console.log('prodotto selezionato in variabile', productSelected);

        this.setState({productSelectedName: productSelected.p_name});
        this.setState({productSelectedDescription: productSelected.p_description});
        this.setState({productSelectedService: productSelected.p_service});
        this.setState({productSelectedPrice: productSelected.p_price});

        this.setState({showModal: true});

    }



    closeModalHandler(){
        this.setState({showModal: false});

    }

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
                    key={index}
                    click={() => this.showDetailsHandler(product, index)} />

            }

        )




        return (
            <div>

            <div className="Products">
                {prods}
            </div>

                <ProductModal
                    show={this.state.showModal}
                    hide={() => this.closeModalHandler()}
                    title={this.state.productSelectedName}
                    service={this.state.productSelectedService}
                    description={this.state.productSelectedDescription}
                    price={this.state.productSelectedPrice}
                />
            </div>


            );



    }
}


