import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import Web3 from 'web3';
import DatePick from './DatePick';
import {axiosinstance} from "../../../components/AxiosInstance/AxiosInstance";
import {withRouter} from 'react-router-dom';
import moment from 'moment';
import axios from "axios/index";

const inlineFlex = {
    display: 'inline-flex'
}

const dataPickStyle = {
    marginLeft: '7px'
}


const serviceModal = (props) => {


    let isLoggedIn = (sessionStorage.getItem('isLogged') === "true");
    let a = moment().format();
    let b = a.substring(0,10);
    sessionStorage.setItem("date",b);
    let prezzo1 = String((props.price)/(sessionStorage.getItem('ethPrice')));
    let prezzoServizio = prezzo1.substring(0,6);


    let handleClick = () => {  //Funzione per il pagamento tramite METAMASK

            let coin = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=EUR';  //prende valore attuale eth
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
                                .then((res2) => {

                                    console.log('Chiamata al Back end per registrare acquisto... ');
                                    let datapost = sessionStorage.getItem('date');
                                    console.log('data servizio', datapost);
                                    const url = 'http://localhost:8091/purchase/' + props.id + "/" + datapost;
                                    let instance = axiosinstance();

                                    instance.post(url)
                                        .then(res3 => {
                                            console.log('devo reindirizzarti ... ');
                                            props.history.push("/");

                                        })
                                        .catch(error => {
                                            console.log(error);
                                        });
                                })
                        })
                        .catch((err) => {
                            console.log('err', err);
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
                        <strong> Prezzo: </strong>  {props.price} € | {prezzoServizio} ETH</p>
                ) : (null)}

                <p style={inlineFlex}>
                    <strong> Seleziona una data: </strong>
                    <div style={dataPickStyle}>
                        <DatePick onSelectedDate={props.selectedData} serviceID={props.id}/>
                    </div>
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


export default withRouter(serviceModal);





