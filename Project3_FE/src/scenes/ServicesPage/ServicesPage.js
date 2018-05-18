import React, { Component } from "react";
import axios from "axios";
import {Navbar, FormGroup, FormControl, Button, Glyphicon } from 'react-bootstrap';

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
        serviceSelectedPrice: " ",
        serviceSelectedId: " ",
        message: "",
        keyword: ""
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

        this.setState({serviceSelectedName: serviceSelected.sr_name});
        this.setState({serviceSelectedType: serviceSelected.sr_type});
        this.setState({serviceSelectedCenter: serviceSelected.sr_wellness_center});
        this.setState({serviceSelectedDescription: serviceSelected.sr_description});
        this.setState({serviceSelectedTime: serviceSelected.sr_time});
        this.setState({serviceSelectedPrice: serviceSelected.sr_price});
        this.setState({serviceSelectedId: serviceSelected.sr_serviceID});

        this.setState({showModal: true});

    }

    closeModalHandler() {
        this.setState({showModal: false});
    }

    handleChange = event => {
        this.setState({
            keyword: event.target.value
        });
    }

    handleSubmit = (event) => {
        console.log('spedisco la keyword a BE per la Query... ');
        event.preventDefault();
        const url =  'http://localhost:8091/services/'+this.state.keyword;
        axios.get(url)
            .then(response => {

                console.log('response della query', response.data.response);
                this.setState({services: response.data.response});

            })
            .catch(error => {
               console.log(error);

            });

    };




    render() {

        // console.log(this.state.keyword);

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
                    serviceId={serviceitem.sr_serviceID}
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

                        <Navbar>
                            <Navbar.Header>

                                <Navbar.Toggle />
                            </Navbar.Header>
                            <Navbar.Collapse>
                               <Navbar.Form pullLeft>
                                    <FormGroup>
                                        <FormControl
                                            autoFocus
                                            type="text"
                                            value={this.state.keyword}
                                            placeholder="Cerca..."
                                            onChange={this.handleChange}
                                        />
                                    </FormGroup>{' '}
                                    <Button onClick={(event) => this.handleSubmit(event)}>
                                        <Glyphicon glyph="glyphicon glyphicon-search" />
                                    </Button>

                                </Navbar.Form>
                            </Navbar.Collapse>
                        </Navbar>

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
                    id={this.state.serviceSelectedId}
                />



            </div>


        );



    }
}

export default ServicesPage;


