import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import Web3 from 'web3';

let handleClick = () => {
    let web3js = new Web3(window.web3.currentProvider);
    console.log(window.web3);
    web3js.eth.sendTransaction({
        to: '0xf59F88E6eA4A937e228E4aaf378e96EDfb646B14',
        from: '0xE08aa75AAE695c4622Cd430FbeBF4B97689d4Ee3',
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
                <p>
                    <strong> Prezzo: </strong>
                    {isLoggedIn ? (
                        <p>{props.price} $ </p>) : (null)}

                </p>
            </Modal.Body>
            <Modal.Footer>
                {isLoggedIn ? (
                <Button onClick={handleClick}> Paga con MetaMask </Button>
                ) : (<Button href={`/LogIn`}>Acquista</Button>)}
                
            </Modal.Footer>
        </Modal>
    );


};

export default serviceModal;





