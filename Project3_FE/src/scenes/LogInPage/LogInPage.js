import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import {loginService} from '../../services/LoginService/LoginService';
import {logout} from "../../services/LogoutService/LogoutService";


import "./LogInPage.css";

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            esito: ""
        };
    }

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
        console.log(this.state);
        loginService(this.state);
        
    }

    logoutHandler = (event) => {
        logout();
    }



    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
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


