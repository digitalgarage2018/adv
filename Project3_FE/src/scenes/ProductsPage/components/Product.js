import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

import './Product.css';

const product = (props) => {


    return (
        <div className="Product">
            <Card>
                <CardImg top width="100%" src={props.path} alt={props.name} />

                <CardBody>
                    <CardTitle>{props.name}</CardTitle>
                    <CardSubtitle>{props.relatedservice}</CardSubtitle>
                    <CardText>{props.description}</CardText>
                    <button>Button</button>
                    <p> {props.price}</p>
                </CardBody>
            </Card>

            <Card>
                <CardImg top width="100%" src={props.path} alt={props.name} />

                <CardBody>
                    <CardTitle>{props.name}</CardTitle>
                    <CardSubtitle>{props.relatedservice}</CardSubtitle>
                    <CardText>{props.description}</CardText>
                    <button>Button</button>
                    <p> {props.price}</p>
                </CardBody>
            </Card>
        </div>
    )
};

export default product;


