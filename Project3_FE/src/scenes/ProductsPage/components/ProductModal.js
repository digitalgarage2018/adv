import React from 'react';
import {Modal, Button} from 'react-bootstrap';


const productModal = (props) => {


    return (

        <Modal show={props.show} onHide={props.hide} >

            <Modal.Header closeButton>
                <Modal.Title>
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>  <strong> Servizio in cui hai usufruito il prodotto: </strong> {props.service} </h5>
                <p>
                    {props.description}
                </p>
                <hr />

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

export default productModal;





