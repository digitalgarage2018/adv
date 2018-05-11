import React, { Component } from "react";
import axios from 'axios';

import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import {loginService} from '../../services/LoginService/LoginService';
import {logout} from "../../services/LogoutService/LogoutService";


import "./LogInPage.css";

export default class Login extends Component {

        state = {
            email: "",
            password: "",
            isLogged: false,
            jwt: ""
        };


    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
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
            u_username: this.state.email,
            u_pword: this.state.password
        })
            .then( response => {
                console.log(response);
                this.setState({isLogged: true, jwt: response.headers.jwt});
                console.log("Stato dopo la LogIn: ", this.state);
                this.props.history.push("/");

            })
            .catch(function (error) {
                console.log(error);
            });

    }

    logoutHandler = (event) => {
        logout();
    }



    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel>UserName </ControlLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.email}
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
                </form>
            </div>

        );
    }
}


