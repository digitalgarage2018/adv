import React, { Component } from "react";
import axios from "axios";

import './ServicesPage.css';
import Service from './components/Service';

import {Modal, Button} from 'react-bootstrap';



class ServicesPage extends Component {

    state = {
        services: [
            {
                sr_name: 'Massaggio thai',
                sr_type: 'Massaggio',
                sr_description: 'Massaggio tradizionale thailandese, che affonda le sue radici ed in tempi remoti nel lontano Oriente.  La leggenda vuole che tale massaggio sia stato inventato dal medico, amico e compagno di viaggio del Buddha.  Grazie ad un sapiente uso delle mani, dita, piedi, gomiti riallineerete i vostri Sen.  Gli innumerevoli benefici sono ormai ben noti. ',
                sr_price: '300',
                sr_time: '60',
                sr_wellness_center: 'Fonteverde',
                sr_image: './images/thai-massage.jpg',
                sr_serviceID: '1'
            },
            {
                sr_name: 'Massaggio thai',
                sr_type: 'Massaggio',
                sr_description: 'Massaggio tradizionale thailandese, che affonda le sue radici ed in tempi remoti nel lontano Oriente.  La leggenda vuole che tale massaggio sia stato inventato dal medico, amico e compagno di viaggio del Buddha.  Grazie ad un sapiente uso delle mani, dita, piedi, gomiti riallineerete i vostri Sen.  Gli innumerevoli benefici sono ormai ben noti. ',
                sr_price: '300',
                sr_time: '60',
                sr_wellness_center: 'Fonteverde',
                sr_image: './images/thai-massage.jpg',
                sr_serviceID: '2'
            },
            {
                sr_name: 'Massaggio thai',
                sr_type: 'Massaggio',
                sr_description: 'Massaggio tradizionale thailandese, che affonda le sue radici ed in tempi remoti nel lontano Oriente.  La leggenda vuole che tale massaggio sia stato inventato dal medico, amico e compagno di viaggio del Buddha.  Grazie ad un sapiente uso delle mani, dita, piedi, gomiti riallineerete i vostri Sen.  Gli innumerevoli benefici sono ormai ben noti. ',
                sr_price: '300',
                sr_time: '60',
                sr_wellness_center: 'Fonteverde',
                sr_image: './images/thai-massage.jpg',
                sr_serviceID: '3'
            },
            {
                sr_name: 'Massaggio thai',
                sr_type: 'Massaggio',
                sr_description: 'Massaggio tradizionale thailandese, che affonda le sue radici ed in tempi remoti nel lontano Oriente.  La leggenda vuole che tale massaggio sia stato inventato dal medico, amico e compagno di viaggio del Buddha.  Grazie ad un sapiente uso delle mani, dita, piedi, gomiti riallineerete i vostri Sen.  Gli innumerevoli benefici sono ormai ben noti. ',
                sr_price: '300',
                sr_time: '60',
                sr_wellness_center: 'Fonteverde',
                sr_image: './images/thai-massage.jpg',
                sr_serviceID: '4'
            }
        ],
        showModal: false,
        serviceSelected: null
    };


    showDetailsHandler(serviceitem, index) {
        this.setState({showModal: true});
        this.setState({serviceSelected: serviceitem});
        console.log(this.state);

    }

    closeModalHandler() {
        this.setState({showModal: false});
        }



    render() {

        console.log(this.state);

        const servicelist = this.state.services.map( (serviceitem, index) =>
            {
                return <Service
                    name={serviceitem.sr_name}
                    path={serviceitem.sr_image}
                    description={serviceitem.sr_description}
                    type={serviceitem.sr_type}
                    price={serviceitem.sr_price}
                    time={serviceitem.sr_time}
                    center={serviceitem.sr_wellness_center}
                    click={() => this.showDetailsHandler(serviceitem, index)}
                    key={index}/>
            }

        )








        return (
            <div>

            <div className="ServicesPage">
            {servicelist}
            </div>

                <Modal show={this.state.showModal} onHide={() => this.closeModalHandler()}>

                        <Modal.Header closeButton>
                            <Modal.Title>  </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h4>Text in a modal</h4>
                            <p>
                                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                            </p>


                            <hr />

                            <h4>Overflowing text to show scroll behavior</h4>
                            <p>
                                Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                                dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
                                ac consectetur ac, vestibulum at eros.
                            </p>
                            <p>
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur
                                et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
                                auctor.
                            </p>
                            <p>
                                Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
                                cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
                                dui. Donec ullamcorper nulla non metus auctor fringilla.
                            </p>


                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => this.closeModalHandler() }>Close</Button>
                        </Modal.Footer>
                    </Modal>



            </div>


        );



    }
}

export default ServicesPage;


