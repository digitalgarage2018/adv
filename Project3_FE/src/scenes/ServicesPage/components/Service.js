import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

import {Button} from 'react-bootstrap';

import './Service.css';


const service = (props) => {

    return (
        <div className="Service">
            <Card>
                <CardImg top width="100%" src={require('../images/thai-massage.jpg')} alt={props.name} />
                <CardBody>
                    <CardTitle>{props.name}</CardTitle>
                    <CardSubtitle>{props.type}</CardSubtitle>
                    <CardText> {props.price} $ </CardText>
                    <Button bsStyle="primary" block onClick={props.click}> Acquista </Button>
                </CardBody>
            </Card>
        </div>
    )
};

export default service;


