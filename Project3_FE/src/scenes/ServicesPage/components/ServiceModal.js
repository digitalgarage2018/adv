import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import Web3 from 'web3';
import DatePick from './DatePick';
import {axiosinstance} from "../../../components/AxiosInstance/AxiosInstance";
import {withRouter} from 'react-router-dom';
import moment from 'moment';



const serviceModal = (props) => {
    let isLoggedIn = sessionStorage.getItem('isLogged');
    let a = moment().format();
    let b = a.substring(0,10);
    sessionStorage.setItem("date",b);

    let handleClick = () => {

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
                    value: web3js.utils.toWei('0.1', 'ether'),
                })
                    .then((res2) => {

                        console.log('Chiamata al Back end per registrare acquisto... ');
                        let datapost = sessionStorage.getItem('date');
                        const url =  'http://localhost:8091/purchase/'+ props.id + "/" + datapost;
                        let instance = axiosinstance();

                        instance.post(url)
                            .then(res3 => {
                                console.log('devo reindirizzarti ... ');
                                props.history.push("/");

                            })
                            .catch(error => {
                                console.log(error);});
                    })
            })
            .catch((err) => {
                console.log('err', err);
            });
    };

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
                        <strong> Prezzo: </strong>  {props.price} $ </p>
                ) : (null)}

            </Modal.Body>
            <Modal.Footer>
                <DatePick
                    onSelectedDate={props.selectedData}
                    serviceID={props.id}/>
                {isLoggedIn ? (
                    <Button onClick={handleClick}> Paga con MetaMask </Button>
                ) : (<Button href={`/LogIn`}>Acquista</Button>)}

            </Modal.Footer>
        </Modal>
    );


};


export default withRouter(serviceModal);





