import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import Web3 from "web3";
import axios from "axios/index";



const productModal = (props) => {

    let prezzo1 = String((props.price)/(sessionStorage.getItem('ethPrice')));
    let prezzoServizio = prezzo1.substring(0,6);

    let handleClick = () => {  //Funzione per il pagamento tramite METAMASK

            let coin = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=EUR';
            axios.get(coin)
                .then( (response) => {
                    console.log('chiedo il valore attuale di ethereum e lo converto')
                    let tmp = String((props.price)/(response.data.EUR));
                    let c = tmp.substring(0,8);
                    console.log('sto chiamando Metamask per ricevere il mio Account');
                    let web3js = new Web3(window.web3.currentProvider);
                    let address = "";
                    web3js.eth.getAccounts()
                        .then((res) => {
                            console.log('sto chiamando Metamask per effettuare la transazione');

                            address = res[0];

                            web3js.eth.sendTransaction({
                                to: '0x6Dc8956E655Ccd80187265107b848D8c5B6d2459',
                                from: address,
                                value: web3js.utils.toWei(c, 'ether'),
                            })
                                .then((res2) => { console.log("ciao");
                                        })

                        .catch((err) => {
                            props.history.push("/");
                            });
                        });
                }).catch((errno)=> {
                console.log('ciao');});
        }
    ;


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
                <strong> Prezzo: </strong>  {props.price} € | {prezzoServizio} ETH
                </p>

        </Modal.Body>

            <Modal.Footer>
                <Button onClick={handleClick}> Paga con MetaMask </Button>
            </Modal.Footer>
        </Modal>
    );

};

export default productModal;





