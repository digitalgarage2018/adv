import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

import {Button} from 'react-bootstrap';

import './Service.css';


const service = (props) => {

    return (
        <div className="Service">
            <Card>
                <CardImg top width="100%" height="260px" src={props.path} alt={props.name} />
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


