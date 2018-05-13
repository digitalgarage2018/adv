import React, {Component } from 'react';
import axios from 'axios';

import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import './SignupPage.css';

const error = {
    color: 'red',
    textalign:'center'};


export default class SignupPage extends Component {

    state = {
        name: "",
        surname: "",
        password: "",
        confirmpassword: "",
        username: "",
        email: "",
        borndate: "",
        bornplace: "",
        walletaddress: "",
        message:""
    };


    validateForm() {

        // deve ritornare un booleano che è l'and di tutte le condizioni di validazione
        // quello che segue è l'esempio del login
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }


    handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:8070/login', {

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

                this.setState({isLogged: true, jwt: response.headers.jwt});
                console.log("Stato dopo la LogIn: ", this.state);
                this.props.history.push("/");

            })
            .catch( error => {
                if (error.response === undefined){
                    this.setState({message:"Network Error"})}

                else if (error.response.data.server === 403)
                {this.setState({message:"Credenziali non corrette"})}


                else if (error.response.data.server === 0){
                    this.setState({message:"Credenziali non corrette"})}



            });

    }


    render() {
        return (
            <div className="SignupPage">
                <form onSubmit={this.handleSubmit}>

                    <FormGroup controlId="name" bsSize="large">
                        <ControlLabel> Nome </ControlLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                    </FormGroup>

                    <FormGroup controlId="surname" bsSize="large">
                        <ControlLabel> Cognome </ControlLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.surname}
                            onChange={this.handleChange}
                        />
                    </FormGroup>

                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel> Indirizzo Email </ControlLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>



                    <FormGroup controlId="username" bsSize="large">
                        <ControlLabel>UserName </ControlLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>

                    <FormGroup controlId="confirmpassword" bsSize="large">
                        <ControlLabel> Conferma Password</ControlLabel>
                        <FormControl
                            value={this.state.confirmpassword}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>

                    <Button
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Registrati
                    </Button>

                    <h4 style={error}> {this.state.message}</h4>
                </form>
            </div>

        );
    }
}