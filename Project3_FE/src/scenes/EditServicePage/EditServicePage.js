import React, { Component } from "react";
import { axiosinstance } from '../../components/AxiosInstance/AxiosInstance';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import './EditServicePage.css';
import imagedefault from '../../images/home.jpg';

// import { editService } from '../../services/EditService/EditService';




const error = {
    color: 'red',
    textalign:'center'};


export default class EditServicePage extends Component {

    state = {
        name: sessionStorage.getItem('name'),
        nameIsChanged: false,

        type: "",
        typeIsChanged: false,

        description: "",
        descriptionIsChanged: false,

        price: 0,
        priceIsChanged: false,

        time: 0,
        timeIsChanged: false,

        image: "",

        serviceID: 0
    };

    componentDidMount() {
        console.log('devo chiamare il GETTER di EditService per prendere le info del selectedService');

        // editService.getSelectedService();



    }

    validateForm() {

        return  (
            this.state.name.length > 0 &&
            this.state.type.length > 0 &&
            this.state.description.length > 0 &&
            this.state.price > 0 &&
            this.state.time > 0
        );
    }


    handleNameChange = event => {

        this.setState({
            [event.target.id]: event.target.value,
            nameIsChanged: true
        });
    }

    handleTypeChange = event => {

        this.setState({
            [event.target.id]: event.target.value,
            typeIsChanged: true
        });
    }

    handleDescriptionChange = event => {

        this.setState({
            [event.target.id]: event.target.value,
            descriptionIsChanged: true
        });
    }


    handlePriceChange = event => {

        this.setState({
            [event.target.id]: event.target.value,
            priceIsChanged: true
        });
    }

    handleTimeChange = event => {

        this.setState({
            [event.target.id]: event.target.value,
            timeIsChanged: true
        });
    }

    handleImageChange = event => {

        this.setState({
            [event.target.id]: event.target.value,
        });
    }

    getNameValidationState() {
        if (this.state.nameIsChanged) {
            const length = this.state.name.length;
            if (length > 0) {
                return 'success';
            } else {
                return 'error';
            }
        } return null;
    }

    getTypeValidationState() {
        if (this.state.typeIsChanged) {
            const length = this.state.type.length;
            if (length > 0) {
                return 'success';
            } else {
                return 'error';
            }
        } return null;
    }

    getDescriptionValidationState() {
        if (this.state.descriptionIsChanged) {
            const length = this.state.description.length;
            if (length > 0) {
                return 'success';
            } else {
                return 'error';
            }
        } return null;
    }

    getPriceValidationState() {
        if (this.state.priceIsChanged) {
            if (this.state.price > 0) {
                return 'success';
            } else {
                return 'error';
            }
        } return null;
    }

    getTimeValidationState() {
        if (this.state.timeIsChanged) {
            if (this.state.time > 0) {
                return 'success';
            } else {
                return 'error';
            }
        } return null;
    }





    handleSubmit = (event) => {
        event.preventDefault();

        console.log('stato dopo la submit: ', this.state);

        if (this.state.image.length<50){
            this.setState({image:imagedefault});
        }
        let url = 'http://localhost:8091/updateService/'+this.state.serviceID;
        let instance = axiosinstance();
        instance.put(url, {

            sr_name:this.state.name,
            sr_type:this.state.type,
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
                    this.props.history.push("/MieiServizi");
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
                    <FormGroup
                        controlId="name"
                        bsSize="large"
                        validationState={this.getNameValidationState()}>
                        <ControlLabel> Nome Servizio </ControlLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.name}
                            onChange={this.handleNameChange}
                        />
                    </FormGroup>

                    <FormGroup controlId="type" bsSize="large" validationState={this.getTypeValidationState()}>
                        <ControlLabel> Tipologia </ControlLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.type}
                            onChange={this.handleTypeChange}
                        />
                    </FormGroup>

                    <FormGroup
                        controlId="description"
                        bsSize="large"
                        validationState={this.getDescriptionValidationState()}>
                        <ControlLabel> Descrizione </ControlLabel>
                        <FormControl
                            componentClass="textarea"
                            autoFocus
                            type="text"
                            value={this.state.description}
                            onChange={this.handleDescriptionChange}/>
                    </FormGroup>

                    <FormGroup
                        controlId="price"
                        bsSize="large"
                        validationState={this.getPriceValidationState()}>
                        <ControlLabel> Prezzo </ControlLabel>
                        <FormControl
                            autoFocus
                            type="number"
                            value={this.state.price}
                            onChange={this.handlePriceChange}
                        />
                    </FormGroup>

                    <FormGroup
                        controlId="time"
                        bsSize="large"
                        validationState={this.getTimeValidationState()}>
                        <ControlLabel> Durata <small> (in minuti) </small> </ControlLabel>
                        <FormControl
                            autoFocus
                            type="number"
                            value={this.state.time}
                            onChange={this.handleTimeChange}
                        />
                    </FormGroup>

                    <FormGroup controlId="image" bsSize="large">
                        <ControlLabel>Immagine <small> (in Base64) </small></ControlLabel>
                        <FormControl
                            autoFocus
                            value={this.state.image}
                            onChange={this.handleImageChange}
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
                        Salva modifiche
                    </Button>

                </form>
            </div>

        )

    }
}



