import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import './Navbar.css';

import axios from 'axios';


class NavBar extends Component {


    state = {
        isLogged: true,
        jwt: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJHYXp6dSIsImV4cCI6MTUyNjM4Mjc3OSwibmFtZSI6IlNpbHZpYSIsInNjb3BlIjoiZGVmYXVsdF91c2VyIn0.LyIb00mIYILmX2HEVL9_NsjJyTzUqAdennwARC6Nv0c",
        message: ""
    };


    logoutHandler = (event) => {
        console.log('Sto facendo la logout...');
        event.preventDefault();

        let instance = axios.create();
        instance.defaults.headers.common['jwt'] = this.state.jwt;
        instance.get('http://localhost:8070/logout'
        )
            .then(response => {
                console.log('Response della logout', response);
                this.setState({isLogged: false});
                console.log('Stato dopo la logout', this.state);
            })
            .catch(error => {
                console.log(error);
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

        return (
            <div className="Navbar">
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/"> Super Relax</a>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                    </Navbar.Header>
                    <Navbar.Collapse>

                        <Nav pullRight>

                            <NavItem eventKey={1} href={`/LogIn`}>
                                Accedi
                            </NavItem>

                            <NavItem eventKey={2} href={`/SignUp`}>
                                Registrazione
                            </NavItem>

                            <NavItem eventKey={3} href={`/Servizi`}>
                                Servizi
                            </NavItem>

                            <NavItem eventKey={4} href={`/Prodotti`}>
                                Prodotti
                            </NavItem>

                            <NavItem eventKey={5} href="#" onClick={(event) => this.logoutHandler(event)}>
                                LogOut
                            </NavItem>

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );


    }
}

export default NavBar;
// export default withRouter(NavBar);

