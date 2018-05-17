import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import Web3 from 'web3';
import DatePick from './DatePicker';

let handleClick = () => {


    let web3js = new Web3(window.web3.currentProvider);

    console.log(window.web3);

    web3js.eth.sendTransaction({
        to: '0x6Dc8956E655Ccd80187265107b848D8c5B6d2459',
        from: '0x2C7be34Be03F241A5E2038041ea6BbD0B7946dD2',
        value: web3js.utils.toWei('1', 'ether'),
    })
};


const serviceModal = (props) => {
    let isLoggedIn = sessionStorage.getItem('isLogged');


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
                <DatePick/>
                {isLoggedIn ? (
                <Button onClick={handleClick}> Paga con MetaMask </Button>
                ) : (<Button href={`/LogIn`}>Acquista</Button>)}

            </Modal.Footer>
        </Modal>
    );


};

export default serviceModal;





