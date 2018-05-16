import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./CenterLogInPage.css";

const error = {
    color: 'red',
    textalign:'center'};

class CenterLogInPage extends Component {


        state = {
            isLogged: false,
            userName: "",
            password: "",
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
        axios.post('http://localhost:8070/loginCenter', {
            'w_username': this.state.userName,
            'w_password': this.state.password
        })
            .then(response => {

                this.setState({isLogged: true});
                console.log('Stato dopo la login', this.state);
                sessionStorage.setItem("isLogged","true");
                sessionStorage.setItem("jwt", response.headers.jwt);



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


            if (!this.state.isLogged) {

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
                                bsStyle="primary"
                                disabled={!this.validateForm()}
                                type="submit">
                                Login
                            </Button>

                           </form>
                        <div align="center">

                        </div>

                    </div>

                );
            } else {
                return (
                    <div>
                        {this.props.history.push("/")}
                        {window.location.reload()}

                        </div>
                );
            }}

}

export default withRouter(CenterLogInPage);


