import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

import {Button} from 'react-bootstrap';

import './Service.css';


const service = (props) => {

    return (
        <div className="Service">
            <Card className="Card">
                <CardImg top width="100%" height="260px" src={props.path} alt={props.name} />
                <CardBody>
                    <CardTitle>{props.name}</CardTitle>
                    <CardSubtitle>{props.type}</CardSubtitle>
                    <Button bsStyle="primary" block onClick={props.click}> Vedi Dettagli </Button>
                </CardBody>
            </Card>
        </div>
    )
};

export default service;


