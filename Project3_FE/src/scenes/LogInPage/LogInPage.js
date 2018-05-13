import React, { Component } from "react";
import axios from 'axios';


import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import {AuthConsumer, AuthProvider} from "../../AuthContext";


import "./LogInPage.css";

const error = {
    color: 'red',
    textalign:'center'};

export default class Login extends Component {

        state = {
            userName: "",
            password: "",
            jwt: "",
            message:""
        };


    validateForm() {
        return this.state.userName.length > 0 && this.state.password.length > 0;
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
            .then( response => {

                this.setState({jwt: response.headers.jwt});
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
            <AuthConsumer>
                {({ login }) => (

            <div className="LoginPage">
                <form onSubmit={(event) => login(event, this.state.userName, this.state.password)}>
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
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.state.password}
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
                        Login
                    </Button>
                    <br />
                    <br />
                    <p align="center">    Non sei ancora registrato? </p>
                    <Button
                        block
                        bsSize="large"
                        onClick={() => this.props.history.push(`/SignUp`)}
                    >
                        Registrati
                    </Button>
                    <h4 style={error}> {this.state.message}</h4>


                </form>
            </div>
                )}
            </AuthConsumer>


        );
    }
}


