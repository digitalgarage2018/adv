import React, { Component } from "react";
import axios from 'axios';

import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import {AuthConsumer} from "../../AuthContext";

import "./LogInPage.css";

const error = {
    color: 'red',
    textalign:'center'};

export default class Login extends Component {

        state = {
            isLogged: false,
            userName: "",
            password: "",
            jwt: "",
            message:""
        };


    validateForm() {
        return this.state.userName.length > 0 && this.state.password.length > 5;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }



    handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8070/login', {
            u_username: this.state.userName,
            u_pword: this.state.password
        })
            .then(response => {

                this.setState({jwt: response.headers.jwt});
                this.setState({isLogged: true});

                console.log('Stato dopo la login', this.state);


                // this.props.history.push("/");

            })
            .catch(error => {
                if (error.response === undefined) {
                    this.setState({message: "Ci dispiace ma qualcosa è andato storto... riprova più tardi!"})
                }

                else if (error.response.data.server === 403) {
                    this.setState({message: "Credenziali non corrette"})
                }


                else if (error.response.data.server === 0) {
                    this.setState({message: "Ci dispiace ma qualcosa è andato storto... riprova più tardi!"})
                }

            });
    };




    render() {
        if ( !this.state.isLogged ) {
            return (
                    <div className="LoginPage">
                        <form onSubmit={(event) => this.handleSubmit(event)}>
                            <FormGroup controlId="userName" bsSize="large">
                                <ControlLabel>UserName </ControlLabel>
                                <FormControl
                                    autoFocus
                                    type="text"
                                    value={this.state.userName}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup controlId="password" bsSize="large">
                                <ControlLabel>Password <small> (almeno 6 caratteri) </small></ControlLabel>
                                <FormControl
                                    value={this.state.password}
                                    onChange={this.handleChange}
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
                                Login
                            </Button>


                            <br/>
                            <br/>
                            <p align="center"> Non sei ancora registrato? </p>
                            <Button
                                block
                                bsSize="large"
                                onClick={() => this.props.history.push(`/SignUp`)}
                            >
                                Registrati
                            </Button>



                        </form>
                    </div>
            )


        } else {
            return (
            <AuthConsumer>
                {({login}) => (
                    <p>
                    {login()}
               {this.props.history.push("/")} </p>
                )}
            </AuthConsumer>
            )
        }
    }



}


