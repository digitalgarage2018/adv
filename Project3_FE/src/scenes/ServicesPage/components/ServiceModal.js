import React from 'react';
import {Modal, Button} from 'react-bootstrap';


const serviceModal = (props) => {

    return (

        <Modal  show={props.show} onHide={props.hide} >

            <Modal.Header closeButton>
                <Modal.Title>
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>  <strong> Centro Benessere: </strong> {props.center} </h5>
                <p>
                    {props.description}
                </p>
                <hr />
                <p>
                    <strong> Tipologia del servizio: </strong>  {props.type}
                </p>
                <p>
                    <strong> Durata del servizio: </strong> {props.time} minuti
                </p>
                <p>
                    <strong> Prezzo: </strong>  {props.price} $
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.hide}> Acquista </Button>
            </Modal.Footer>
        </Modal>
    );


};

export default serviceModal;





