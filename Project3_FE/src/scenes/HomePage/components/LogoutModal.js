import React from 'react';
import {Modal, Button} from 'react-bootstrap';


const logoutModal = (props) => {


    return (

        <Modal show={props.show} onHide={props.hide} >

            <Modal.Header closeButton>
                <Modal.Title>
                    Log Out
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <p>
                    Sei sicuro di voler uscire?
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.hide}> No </Button>
                <Button onClick={props.hide}> Sì </Button>
            </Modal.Footer>
        </Modal>
    );


};

export default logoutModal;





