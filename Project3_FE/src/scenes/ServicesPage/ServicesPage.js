import React, { Component } from "react";
import axios from "axios";

import './ServicesPage.css';
import Service from './components/Service';
import ServiceModal from './components/ServiceModal';

import {Col, Grid, Row} from 'react-bootstrap';

const error = {
    color: 'red',
    textalign:'center'};



class ServicesPage extends Component {

    state = {
        services: [],
        showModal: false,
        serviceSelectedName: " ",
        serviceSelectedType: " ",
        serviceSelectedCenter: " ",
        serviceSelectedDescription: " ",
        serviceSelectedTime: " ",
        serviceSelectedPrice: " "


    };

    componentDidMount(){
        console.log('Sto facendo la chiamata ai servizi...');
        axios.get('http://localhost:8091/services/')
            .then( response => {
                console.log('res', response);

                console.log('res.data', response.data);
                    this.setState({services: response.data.response});
                }

            )
            .catch(error => {
                this.setState({message: "Ci dispiace ma qualcosa è andato storto... riprova più tardi!"})
            });

    }


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
                return (
                <Col key={index} md={4} sm={6}>
                <Service
                    name={serviceitem.sr_name}
                    path={serviceitem.sr_image}
                    description={serviceitem.sr_description}
                    type={serviceitem.sr_type}
                    price={serviceitem.sr_price}
                    time={serviceitem.sr_time}
                    center={serviceitem.sr_wellness_center}
                    click={() => this.showDetailsHandler(serviceitem, index)}
                    key={index}/>
                </Col>
            );
            }

        )


        return (

            <div>
                <Grid>

                    <Row className="show-grid">
                        <h4 align="center" style={error}> {this.state.message}</h4>
                        {servicelist}
                    </Row>

                </Grid>

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


