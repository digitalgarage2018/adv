import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

import {Button } from 'react-bootstrap';

import './Product.css';


const product = (props) => {

    return (
        <div className="Product">
            <Card>

                <CardImg top width="100%" height="270px"  src={props.path} alt={props.name}  />

                <CardBody>
                    <CardTitle>{props.name}</CardTitle>
                    <CardSubtitle>{props.relatedservice}</CardSubtitle>
                    <CardText> {props.price} $ </CardText>
                    <Button bsStyle="primary" block onClick={props.click}> Acquista </Button>

                </CardBody>
            </Card>

        </div>
    )
};

export default product;


