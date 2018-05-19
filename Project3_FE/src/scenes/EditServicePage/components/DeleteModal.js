import React from 'react';
import { withRouter } from 'react-router-dom';

import {Modal, Button} from 'react-bootstrap';
import { axiosinstance } from '../../../components/AxiosInstance/AxiosInstance';



const deleteModal = (props) => {

    let message = "";

    let deleteServiceHandler = (event) => {
        event.preventDefault();
        console.log('Chiamata al BE per eliminare servizio', props.id);


        let url = 'http://localhost:8091/deleteService/' + props.id;
        console.log('verifica url', url);
        let instance = axiosinstance();
        instance.get(url)
            .then( response => {
                console.log("response della Delete: ", response );
                props.history.push("/MieiServizi");
            })
            .catch( error => {
                console.log('Error della Delete', error);
                props.history.push("/MieiServizi");
            });

    }


    return (

        <Modal show={props.show} onHide={props.hide}>

            <Modal.Header closeButton>
                <Modal.Title>
                    Elimina servizio
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Sei sicuro di voler eliminare il servizio?
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.hide}> No </Button>
                <Button onClick={deleteServiceHandler}> Sì </Button>
            </Modal.Footer>
        </Modal>
    );

};

export default withRouter(deleteModal);





