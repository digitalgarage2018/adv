import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from "axios/index";

import accappatoio from "./images/accappatoio.jpg";
import candele from "./images/candele.jpeg";
import candele2 from "./images/candele2.jpg";
import ciabatte from "./images/ciabatte.jpg";
import cremaCalendula from "./images/crema-calendula.jpg";
import cremaCalendula2 from "./images/crema-calendula2.jpg";
import cremaCamomilla from "./images/crema-camomilla.jpg";
import shiatsu from "./images/kit-massaggio-shiatsu.jpg";
import thai from "./images/kit-massaggio-thai.jpg";
import oliProfumati from "./images/oli-profumati.jpg";
import olioArgan from "./images/olio-argan.jpg";
import telo from "./images/telo.jpg";


import {productsService} from '../../services/productsPageService/productsPageService';

import Product from './components/Product';



export default class ProductsPage extends Component {

    state = {
        products: [],
        imagePaths: []
    }




    componentDidMount(){
        axios.get('http://localhost:8091/products/')
            .then( response => {
                this.setState({products: response.data});
                this.setState({imagePaths: [
                        "accappatoio",
                        "candele",
                        "candele2",
                        "ciabatte",
                        "cremaCalendula",
                        "cremaCalendula2",
                        "cremaCamomilla",
                        "shiatsu",
                        "thai",
                        "oliProfumati",
                        "olioArgan",
                        "telo"
                    ]});
                }
            )
            .catch(function (error) {
                console.log(error);
            });

    }




    render() {

        const productlist = this.state.products.map( (prod, index) => {

           return
            <Product name={prod.p_name} path={this.imagePaths[index]} />


        });


        return (
            <div>
                {productlist}
            </div>
        )

    }
}
