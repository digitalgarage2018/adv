import React, { Component } from "react";
import axios from 'axios';

import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import {logout} from "../../services/LogoutService/LogoutService";


import "./LogInPage.css";

const error = {
    color: 'red',
    textalign:'center'};

export default class Login extends Component {

        state = {
            userName: "",
            password: "",
            isLogged: false,
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
        // console.log(this.state);
        // const prova = {...this.state};
        // console.log('prova copia state', prova);
        axios.post('http://localhost:8070/login', {
            u_username: this.state.userName,
            u_pword: this.state.password
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

    logoutHandler = (event) => {

    }




    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
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
                    <Button
                        block
                        bsSize="large"
                        onClick={this.logoutHandler}
                    >
                        Log Out
                    </Button>
                    <h4 style={error}> {this.state.message}</h4>


                </form>


            </div>


        );
    }
}


