import React, { Component } from 'react';
import axios from 'axios';

import { Button, FormGroup, FormControl, ControlLabel, Checkbox } from "react-bootstrap";

import './SignupPage.css';

const error = {
    color: 'red',
    textalign:'center'};


export default class SignupPage extends Component {

    state = {
        name: "",
        nameIsChanged: false,

        surname: "",
        surnameIsChanged: false,

        password: "",
        passwordIsChanged: false,

        confirmpassword: "",
        confirmpasswordIsChanged: false,

        username: "",
        usernameIsChanged: false,

        email: "",
        emailIsChanged: false,

        borndate: "",
        borndateIsChanged: false,

        bornplace: "",
        bornplaceIsChanged: false,


        checked: false,
        checkedIsChanging: false,

        walletaddress: "",
        message:""
    };


    validateForm() {

         return  (


            this.state.name.length > 0 &&
            this.state.surname.length > 0 &&
            (this.state.borndate.match(/^([0-9]{2})-([0-9]{2})-([0-9]{4})$/) !== null) &&
            this.state.bornplace.length > 0 &&
            this.state.password.length > 5 &&
            this.state.checked &&
            this.state.confirmpassword === this.state.password &&
           (this.state.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/) !== null) &&
            this.state.username.length > 0

       );

    }


    handleSubmit = (event) => {
        event.preventDefault();

        console.log('stato dopo la submit: ', this.state);

        axios.post('http://localhost:8070/signUpController', {
            u_username: this.state.username,
            u_pword: this.state.password,
            u_email: this.state.email,
            u_name: this.state.name,
            u_surname: this.state.surname,
            u_born_date: this.state.borndate,
            u_born_place: this.state.bornplace,
            u_wallet_address: this.state.walletaddress
        })
            .then( response => {

                console.log("Stato dopo la LogIn: ", this.state);
                sessionStorage.setItem('isLogged','true');
                sessionStorage.setItem('jwt', response.headers.jwt);

                this.props.history.push("/");
                window.location.reload();


            })
            .catch( error => {
                if (error.response === undefined){
                    this.setState({message:"Ci dispiace ma qualcosa è andato storto... riprova più tardi!"})}

                else if (error.response.data.server === 403)
                {this.setState({message:"Nome utente già un uso. Prova con un altro username"})}


                else if (error.response.data.server === 0){
                    this.setState({message:"Ci dispiace ma qualcosa è andato storto... riprova più tardi!"})}

            });


    }

    checkboxcChanginHandler = () => {
        this.setState({checkedIsChanging: true});
        const isChecked = !this.state.checked;
        this.setState({checked: isChecked});
    }

    handleNameChange = event => {

        this.setState({
            [event.target.id]: event.target.value,
            nameIsChanged: true
        });
    }

    handleSurnameChange = event => {

        this.setState({
            [event.target.id]: event.target.value,
            surnameIsChanged: true
        });
    }

    handleBorndateChange = event => {

        this.setState({
            [event.target.id]: event.target.value,
            borndateIsChanged: true
        });
    }

    handleBornplaceChange = event => {

        this.setState({
            [event.target.id]: event.target.value,
            bornplaceIsChanged: true
        });
    }

    handleUsernameChange = event => {

        this.setState({
            [event.target.id]: event.target.value,
            usernameIsChanged: true
        });
    }

    handleEmailChange = event => {

        this.setState({
            [event.target.id]: event.target.value,
            emailIsChanged: true
        });
    }

    handlePasswordChange = event => {

        this.setState({
            [event.target.id]: event.target.value,
            passwordIsChanged: true
        });
    }

    handleConfirmpasswordChange = event => {

        this.setState({
            [event.target.id]: event.target.value,
            confirmpasswordIsChanged: true
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

    getSurnameValidationState() {
        if (this.state.surnameIsChanged) {
            const length = this.state.surname.length;
            if (length > 0) {
                return 'success';
            } else {
                return 'error';
            }
        } return null;
    }

    getBorndateValidationState() {
        if (this.state.borndateIsChanged) {
            if (this.state.borndate.match(/^([0-9]{2})-([0-9]{2})-([0-9]{4})$/) !== null) {
                return 'success';
            } else {
                return 'error';
            }
        } return null;
    }

    getBornplaceValidationState() {
        if (this.state.bornplaceIsChanged) {
            const length = this.state.bornplace.length;
            if (length > 0) {
                return 'success';
            } else {
                return 'error';
            }
        } return null;
    }

    getCheckboxValidationState() {
        if (this.state.checkedIsChanging) {
            if (this.state.checked) {
                return 'success';
            } else {
                return 'error';
            }
        }

    }



    getUsernameValidationState() {
        if (this.state.usernameIsChanged) {
            const length = this.state.username.length;
            if (length > 0) {
                return 'success';
            } else {
                return 'error';
            }
        } return null;
    }

    getEmailValidationState() {
        if (this.state.emailIsChanged) {
            if (this.state.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/) !== null) {
                return 'success';
            } else {
                return 'error';
            }
        } return null;
    }

    getPasswordValidationState() {
        if (this.state.passwordIsChanged) {
            const length = this.state.password.length;
            if (length > 5) {
                return 'success';
            } else {
                return 'error';
            }
        } return null;
    }

    getConfirmpasswordValidationState() {
        if (this.state.confirmpasswordIsChanged) {

            if (this.state.confirmpassword === this.state.password) {
                return 'success';
            } else {
                return 'error';
            }
        } return null;
    }




    render() {
        
            return (

                <div className="SignupPage">
                    <form onSubmit={this.handleSubmit}>


                        <h3> INFORMAZIONI PERSONALI </h3>

                        <FormGroup
                            controlId="name"
                            bsSize="large"
                            validationState={this.getNameValidationState()}>
                            <ControlLabel> Nome </ControlLabel>
                            <FormControl
                                autoFocus
                                type="text"
                                value={this.state.name.valore}
                                onChange={this.handleNameChange}
                            />
                        </FormGroup>

                        <FormGroup
                            controlId="surname"
                            bsSize="large"
                            validationState={this.getSurnameValidationState()}
                            >
                            <ControlLabel> Cognome </ControlLabel>
                            <FormControl
                                autoFocus
                                type="text"
                                value={this.state.surname}
                                onChange={this.handleSurnameChange}
                            />
                        </FormGroup>

                        <FormGroup
                            controlId="borndate"
                            bsSize="large"
                            validationState={this.getBorndateValidationState()}
                        >
                            <ControlLabel> Data di nascita <small> (formato gg-mm-aaaa) </small></ControlLabel>
                            <FormControl
                                autoFocus
                                type="text"
                                value={this.state.borndate}

                                onChange={this.handleBorndateChange}
                            />
                        </FormGroup>

                        <FormGroup
                            controlId="bornplace"
                            bsSize="large"
                            validationState={this.getBornplaceValidationState()}>
                            <ControlLabel> Luogo di nascita </ControlLabel>
                            <FormControl
                                autoFocus
                                type="text"
                                value={this.state.bornplace}
                                onChange={this.handleBornplaceChange}
                            />
                        </FormGroup>

                        <FormGroup
                            controlId="checkbox"
                            bsSize="large"
                            validationState={this.getCheckboxValidationState()}>
                        <Checkbox
                            readOnly

                            onChange={() => this.checkboxcChanginHandler()}>
                            Dichiaro di essere in condizioni di buona salute
                        </Checkbox>
                        </FormGroup>


                        <hr/>

                        <h3> INFORMAZIONI D'ACCESSO </h3>


                        <FormGroup
                            controlId="username"
                            bsSize="large"
                            validationState={this.getUsernameValidationState()}>
                            <ControlLabel> Username </ControlLabel>
                            <FormControl
                                autoFocus
                                type="text"
                                value={this.state.username}
                                onChange={this.handleUsernameChange}
                            />
                        </FormGroup>

                        <FormGroup
                            controlId="email"
                            bsSize="large"
                            validationState={this.getEmailValidationState()}>
                            <ControlLabel> Indirizzo Email </ControlLabel>
                            <FormControl
                                autoFocus
                                type="email"
                                value={this.state.email}
                                onChange={this.handleEmailChange}
                            />
                        </FormGroup>

                        <FormGroup
                            controlId="password"
                            bsSize="large"
                            validationState={this.getPasswordValidationState()}>
                            <ControlLabel>Password <small> (almeno 6 caratteri) </small></ControlLabel>
                            <FormControl
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                                type="password"
                            />
                        </FormGroup>

                        <FormGroup
                            controlId="confirmpassword"
                            bsSize="large"
                            validationState={this.getConfirmpasswordValidationState()}>
                            <ControlLabel> Conferma Password</ControlLabel>
                            <FormControl
                                value={this.state.confirmpassword}
                                onChange={this.handleConfirmpasswordChange}
                                type="password"
                            />
                        </FormGroup>
                        <h4 align="center" style={error}> {this.state.message}</h4>

                        <Button
                            block
                            bsSize="large"
                            disabled={!this.validateForm()}
                            type="submit"
                        >
                            Registrati
                        </Button>

                    </form>
                </div>

            )
        
            


            }
        }
    