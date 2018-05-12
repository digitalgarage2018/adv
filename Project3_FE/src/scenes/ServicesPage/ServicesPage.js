import React, { Component } from "react";
import axios from "axios";

import './ServicesPage.css';
import Service from './components/Service';

import ServiceModal from './components/ServiceModal';





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
        serviceSelectedName: " ",
        serviceSelectedType: " ",
        serviceSelectedCenter: " ",
        serviceSelectedDescription: " ",
        serviceSelectedTime: " ",
        serviceSelectedPrice: " "


    };


    showDetailsHandler(serviceitem, index) {


        const serviceSelected = this.state.services[index];
        console.log('servizio selezionato in variabile', serviceSelected);

        // const nome = prova.sr_name;
        // console.log('nome del servizio selezionato in variabile', serviceSelected.sr_name);



        this.setState({serviceSelectedName: serviceSelected.sr_name});
        this.setState({serviceSelectedType: serviceSelected.sr_type});
        this.setState({serviceSelectedCenter: serviceSelected.sr_wellness_center});
        this.setState({serviceSelectedDescription: serviceSelected.sr_description});
        this.setState({serviceSelectedTime: serviceSelected.sr_time});
        this.setState({serviceSelectedPrice: serviceSelected.sr_price});


        // console.log('nome del servizio sel. nello STATO', this.state.serviceSelectedName);

        this.setState({showModal: true});

    }

    closeModalHandler() {
        this.setState({showModal: false});
    }



    render() {

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
                <ServiceModal
                    show={this.state.showModal}
                    hide={() => this.closeModalHandler()}
                    title={this.state.serviceSelectedName}
                    center={this.state.serviceSelectedCenter}
                    description={this.state.serviceSelectedDescription}
                    type={this.state.serviceSelectedType}
                    time={this.state.serviceSelectedTime}
                    price={this.state.serviceSelectedPrice}


                />



            </div>


        );



    }
}

export default ServicesPage;


