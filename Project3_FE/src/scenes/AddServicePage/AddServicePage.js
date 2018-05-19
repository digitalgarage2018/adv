import React, { Component } from 'react';
import { axiosinstance } from '../../components/AxiosInstance/AxiosInstance';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './AddServicePage.css';

const error = {
    color: 'red',
    textalign:'center'};


export default class AddServicePage extends Component {

    state = {
        name: "",
        nameIsChanged: false,

        type: "",
        typeIsChanged: false,

        description: "",
        descriptionIsChanged: false,

        price: 0,
        priceIsChanged: false,

        time: 0,
        timeIsChanged: false,

        file: '',
        imagePreviewUrl: ''
    };

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

    handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
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

        sessionStorage.setItem('imageUploaded', this.state.imagePreviewUrl);
        console.log('handle uploading: ', this.state.file);

        let instance = axiosinstance();
        instance.post('http://localhost:8091/addService', {

            sr_name:this.state.name,    
            sr_type:this.state.type,
	        sr_description:this.state.description,
	        sr_price:this.state.price,
	        sr_time:this.state.time,
	        sr_image:sessionStorage.getItem('imageUploaded')
	        
        }).then( response => {

                console.log("Stato dopo l'inserimento: ", this.state);
                if (response.data.server === 406)
                {this.setState({message:"Non hai i permessi per aggiungere un servizio. Loggati come centro benessere"})}
                else{
                this.props.history.push("/MieiServizi");
                window.location.reload();
                }
        }).catch( error => {
                if (error.response.status === 400){
                    this.setState({message:"Inserire degli interi maggiori di zero in prezzo e durata"})
                }
                else{
                    this.setState({message:error.response.data.response})
                }
            });
    }

    render() {

        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<div className="imgPreview"> <img src={imagePreviewUrl} /> </div>);
        } else {
            $imagePreview = (null);
        }

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
                            <ControlLabel> Immagine </ControlLabel>
                            <FormControl
                                autoFocus
                                onChange={(e)=>this.handleImageChange(e)}
                                type="file"
                            />
                        </FormGroup>

                        <div>
                           {$imagePreview}
                        </div>

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
    