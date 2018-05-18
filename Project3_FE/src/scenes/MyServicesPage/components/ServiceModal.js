import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import DatePick from './DatePick';
// import { editService } from '../../../services/EditService/EditService';


const serviceModal = (props) => {




    let isLoggedIn = sessionStorage.getItem('isLogged');

  
    sessionStorage.setItem('name', props.title);


    const editServiceHandler = (event) => {
        console.log('devo chiamare EditService per settare le proprietà di selected Service');

        // editService.setSelectedService("CIAO");






    }


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

                {isLoggedIn ? (
                    <p>
                        <strong> Prezzo: </strong>  {props.price} $ </p>
                ) : (null)}

            </Modal.Body>
            <Modal.Footer>
                <DatePick onSelectedDate={props.selectedData}/>

                <Button onClick={editServiceHandler} href={`/ModificaServizio`}> Modifica </Button>
{/*
                <Button onClick={this.handleClick}href={`/ModificaServizio`}>Modifica</Button>
*/}


            </Modal.Footer>
        </Modal>
    );


};

export default serviceModal;





