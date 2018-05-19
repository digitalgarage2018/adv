import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

import {Button } from 'react-bootstrap';

import './Product.css';
import axios from "axios/index";


const product = (props) => {

    let coin = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=EUR';
    axios.get(coin)
        .then( (response1) => {
            let ethPrice = String(response1.data.EUR);
            sessionStorage.setItem('ethPrice',ethPrice);
        }).catch();// PREZZO ATTUALE ETH PER CALCOLARE PREZZO PRODOTTO CARICATO IL MODALE

    return (
        <div className="Product">
            <Card className="Card">

                <CardImg top width="100%" height="260px"  src={props.path} alt={props.name}  />

                <CardBody>
                    <CardTitle>{props.name}</CardTitle>
                    <CardSubtitle>{props.relatedservice}</CardSubtitle>
                    <Button bsStyle="primary" block onClick={props.click}> Acquista </Button>

                </CardBody>
            </Card>

        </div>
    )
};

export default product;


