import React, { Component } from "react";

import { axiosinstance } from '../../components/AxiosInstance/AxiosInstance';

import './ProductsPage.css';
import Product from './components/Product';
import ProductModal from './components/ProductModal';

import {Col, Grid, Row} from 'react-bootstrap';

const error = {
    color: 'red',
    textalign:'center'};


class ProductsPage extends Component {



    state = {
        products: [],
        productSelectedName: "",
        productSelectedDescription: "",
        productSelectedService: "",
        productSelectedPrice: "",
        showModal: false,
        message: ""
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
        console.log('Sto facendo la chiamata ai prodotti...');



        let instance = axiosinstance();
        // instance.get('http://localhost:8091/products/')
        instance.get('http://localhost:8091/productsUser/')
            .then( response => {
                    console.log('res.data', response.data.response);
                    console.log('prova lunghezza', response.data.response.length);
                    if (response.data.server === 200) {
                        if (response.data.response.length === 0){
                            this.setState({products: [], message: "Non ci sono prodotti da visualizzare"});
                        }
                        else{
                            this.setState({products: response.data.response, message: ""});
                        }

                    }else if(response.data.server === 406) {
                        this.setState({products: [], message: "Non hai i permessi per vedere i prodotti"});
                    }else if(response.data.server === 504) {
                        this.setState({products: [], message: "Sessione scaduta. Per favore accedi nuovamente"});
                    }else if(response.data.server === 403) {
                        this.setState({products: [], message: "Per favore accedi"});
                    }else {
                        this.setState({products: [], message: "Non ci sono prodotti da visualizzare"});
                    }

                }

            )
            .catch(error => {
                this.setState({message: "Ci dispiace ma qualcosa è andato storto... riprova più tardi!"})
            });

    }



    render() {

        const prods = this.state.products.map( (product, index) =>
            {
                return (
                <Col key={index} md={4} sm={6}>
                <Product
                    name={product.p_name}
                    path={product.p_image}
                    description={product.p_description}
                    relatedservice={product.p_service}
                    price={product.p_price}
                    click={() => this.showDetailsHandler(product, index)}
                    key={index} />
                </Col>
                );

            }

        )


        return (
            <div>
                <Grid>

                    <Row className="show-grid">
                        <h4 align="center" style={error}> {this.state.message}</h4>
                        {prods}
                    </Row>

                </Grid>

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

export default ProductsPage;



