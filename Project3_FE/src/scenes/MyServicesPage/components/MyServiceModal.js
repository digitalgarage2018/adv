import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import DatePick from './DatePick';

const inlineFlex = {
    display: 'inline-flex'
}

const dataPickStyle = {
    marginLeft: '7px'
}



const myServiceModal = (props) => {




    let isLoggedIn = sessionStorage.getItem('isLogged');

  
    sessionStorage.setItem('serviceSelectedName', props.title);
    sessionStorage.setItem('serviceSelectedType', props.type);
    sessionStorage.setItem('serviceSelectedDescription', props.description);
    sessionStorage.setItem('serviceSelectedPrice', props.price);
    sessionStorage.setItem('serviceSelectedTime', props.time);
    sessionStorage.setItem('serviceSelectedID', props.id);
    sessionStorage.setItem('serviceSelectedImage', props.image);


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
                        <strong> Prezzo: </strong>  {props.price} € </p>
                ) : (null)}

                <div style={inlineFlex}>
                    <strong> Seleziona una data: </strong>
                    <div style={dataPickStyle}>
                    <DatePick onSelectedDate={props.selectedData} serviceID={props.id}/>
                    </div>
                </div>

                </Modal.Body>
            <Modal.Footer>


                <Button href={`/ModificaServizio`}> Modifica </Button>

            </Modal.Footer>
        </Modal>
    );


};

export default myServiceModal;





