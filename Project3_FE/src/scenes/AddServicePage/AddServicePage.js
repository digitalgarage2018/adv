import React, { Component } from 'react';
import axios from 'axios';

import { axiosinstance } from '../../components/AxiosInstance/AxiosInstance';

import { Button, FormGroup, FormControl, ControlLabel, Checkbox } from "react-bootstrap";

import './AddServicePage.css';
import imagedefault from '../../images/home.jpg';

const error = {
    color: 'red',
    textalign:'center'};


export default class AddServicePage extends Component {

    state = {
        name: "",
        srtype: "",
        description: "",
        price: "",
        time: "",
        image: ""
    };

    validateForm() {

         return  (

            this.state.name.length > 0 &&
            this.state.srtype.length > 0 &&
            this.state.description.length > 0 &&
            this.state.price.length > 0 &&
            this.state.time.length > 0

       );

    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }


    handleSubmit = (event) => {
        event.preventDefault();

        console.log('stato dopo la submit: ', this.state);

        if (this.state.image.length<50){
            this.setState({image:imagedefault});
        }
        let instance = axiosinstance();
        instance.post('http://localhost:8091/addService', {

            sr_name:this.state.name,    
            sr_type:this.state.srtype,
	        sr_description:this.state.description,
	        sr_price:this.state.price,
	        sr_time:this.state.time,
	        sr_image:this.state.image
	        
        })
            .then( response => {

                console.log("Stato dopo l'inserimento: ", this.state);
                if (response.data.server === 406)
                {this.setState({message:"Non hai i permessi per aggiungere un servizio. Loggati come centro benessere"})}
                else{
                this.props.history.push("/Servizi");
                window.location.reload();
                }


            })
            .catch( error => {
                if (error.response.status === 400){
                    this.setState({message:"Inserire degli interi maggiori di zero in prezzo e durata"})
                }
                else{
                    this.setState({message:error.response.data.response})
                }
            });

    }

    render() {
        
            return (

                <div className="AddServicePage">
                    <form onSubmit={this.handleSubmit}>

                        <h3> INFORMAZIONI SERVIZIO </h3>
                        <hr />
                        <FormGroup controlId="name" bsSize="large">
                            <ControlLabel> Nome Servizio </ControlLabel>
                            <FormControl
                                autoFocus
                                type="text"
                                value={this.state.name}
                                onChange={this.handleChange}
                            />
                        </FormGroup>

                        <FormGroup controlId="srtype" bsSize="large">
                            <ControlLabel> Tipologia </ControlLabel>
                            <FormControl
                                autoFocus
                                type="text"
                                value={this.state.srtype}
                                onChange={this.handleChange}
                            />
                        </FormGroup>

                        <FormGroup controlId="description">
                            <ControlLabel> Descrizione </ControlLabel>
                            <FormControl
                                componentClass="textarea"
                                autoFocus
                                type="text"
                                value={this.state.description}
                                onChange={this.handleChange}/>
                        </FormGroup>

                      {/*  <FormGroup controlId="description" bsSize="large">
                            <ControlLabel> Descrizione </ControlLabel>
                            <FormControl
                                autoFocus
                                type="text"
                                value={this.state.description}
                                onChange={this.handleChange}
                            />
                        </FormGroup>*/}

                        <FormGroup controlId="price" bsSize="large">
                            <ControlLabel> Prezzo </ControlLabel>
                            <FormControl
                                autoFocus
                                type="text"
                                value={this.state.price}
                                onChange={this.handleChange}
                            />
                        </FormGroup>

                        <FormGroup controlId="time" bsSize="large">
                            <ControlLabel> Durata <small> (in minuti) </small> </ControlLabel>
                            <FormControl
                                autoFocus
                                type="text"
                                value={this.state.time}
                                onChange={this.handleChange}
                            />
                        </FormGroup>

                        <FormGroup controlId="image" bsSize="large">
                            <ControlLabel>Immagine <small> (in Base64) </small></ControlLabel>
                            <FormControl
                                value={this.state.image}
                                onChange={this.handleChange}
                                type="text"
                            />
                        </FormGroup>

                        <hr/>

                        <h4 align="center" style={error}> {this.state.message}</h4>

                        <Button
                            block
                            bsSize="large"
                            disabled={!this.validateForm()}
                            type="submit"
                        >
                            Aggiungi servizio
                        </Button>

                    </form>
                </div>

            )
        
            }
        }
    