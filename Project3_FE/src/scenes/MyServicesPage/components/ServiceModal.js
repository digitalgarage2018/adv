import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import Web3 from 'web3';
import DatePick from './DatePick';
import {axiosinstance} from "../../../components/AxiosInstance/AxiosInstance";

/*let handleClick = () => {


let web3js = new Web3(window.web3.currentProvider);
    let address = "";
    web3js.eth.getAccounts()
        .then((res) => {

            address = res[0];

            web3js.eth.sendTransaction({
            to: '0x6Dc8956E655Ccd80187265107b848D8c5B6d2459',
            from: address,
            value: web3js.utils.toWei('1', 'ether'),
        })
            .then((res2) => {
                console.log(`ho effettuato Metamask ${res}`);
               /!* console.log('Chiamata al Back end per registrare acquisto... ');


                const url =  'http://localhost:8091/purchase/'+ props.id + "/" + "";
                let instance = axiosinstance();

                instance.post('http://localhost:8070/purchase/{service_id}/{purchase_date}')
                    .then(response => {

                        sessionStorage.setItem('isLogged','false');
                        this.props.history.push("/");
                        window.location.reload();
                    })
                    .catch(error => {
                        console.log(error);
                    });*!/

            })
    })
        .catch((err) => {
            console.log('err', err);
    });
};*/



const serviceModal = (props) => {
    let isLoggedIn = sessionStorage.getItem('isLogged');


    let handleClick = () => {

        console.log('Chiamata al Back end per registrare acquisto... ');

        // 'http://localhost:8070/purchase/{service_id}/{purchase_date}'
        const url =  'http://localhost:8091/purchase/'+ props.id + "/" + "2018-07-21";
        let instance = axiosinstance();

        instance.post(url)
            .then(response => {

                console.log(response);
            })
            .catch(error => {
                console.log(error);});

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

                <Button href={`/ModificaServizio`}>Modifica</Button>

            </Modal.Footer>
        </Modal>
    );


};

export default serviceModal;





