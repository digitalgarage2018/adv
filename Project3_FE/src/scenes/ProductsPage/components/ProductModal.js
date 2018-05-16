import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import Web3 from "web3";



const productModal = (props) => {


    let handleClick = () => {
        let web3js = new Web3(window.web3.currentProvider);
        console.log(window.web3);
        web3js.eth.sendTransaction({
            to: '0xf59F88E6eA4A937e228E4aaf378e96EDfb646B14',
            from: '0xE08aa75AAE695c4622Cd430FbeBF4B97689d4Ee3',
            value: web3js.utils.toWei('1', 'ether'),
        })
    };


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
                <Button onClick={handleClick}> Paga con MetaMask </Button>
            </Modal.Footer>
        </Modal>
    );


};

export default productModal;





