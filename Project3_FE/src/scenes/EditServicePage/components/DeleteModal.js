import React from 'react';
import { withRouter } from 'react-router-dom';

import {Modal, Button} from 'react-bootstrap';

import { axiosinstance } from '../../../components/AxiosInstance/AxiosInstance';


const deleteModal = (props) => {

    let deleteServiceHandler = (event) => {
        event.preventDefault();
        console.log('Chiamata al BE per eliminare servizio', props.id);


        let url = 'http://localhost:8091/deleteService/' + props.id;
        console.log('verifica url', url);
        let instance = axiosinstance();
        instance.get(url)
            .then( response => {

                console.log("response della delete: ", response );
                props.history.push("/MieiServizi");

                /*if (response.data.server === 201)
                {  props.history.push("/MieiServizi"); }
                else if (response.data.server === 406){
                    this.setState({message:"Non hai i permessi per modificare un servizio. Accedi come centro benessere"});
                }else if(response.data.server === 504) {
                    this.setState({message:"Sessione scaduta. Per favore accedi nuovamente"});
                }else if(response.data.server === 403) {
                    this.setState({message:"Per favore accedi"});
                }else {
                    this.setState({message:"Ci scusiamo, vi è stato un errore: "+response.data.response});
                }*/


            })
            .catch( error => {
                console.log('error della delete', error);

                /*if (error.response.status === 400){
                    this.setState({message:"Inserire degli interi maggiori di zero in prezzo e durata"})
                }
                else{
                    this.setState({message:"Ci scusiamo, vi è stato un errore: "+error.response.data.response})
                }*/
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





