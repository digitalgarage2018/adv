import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import './Navbar.css';


import { axiosinstance } from '../AxiosInstance/AxiosInstance';


class NavBar extends Component {


    state = {
        isLogged: sessionStorage.getItem('isLogged'),
        message: ""
    };

    logoutHandler = (event) => {
        console.log('Sto facendo la logout...');
        event.preventDefault();

        let instance = axiosinstance();
        instance.get('http://localhost:8070/logout')
            .then(response => {
                console.log('Response della logout', response);
                this.setState({isLogged: false});
                sessionStorage.setItem('isLogged','false');
                this.setState(sessionStorage.getItem('isLogged'));
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
        const isLoggedIn = this.state.isLogged;
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

                            {!isLoggedIn ? (
                            <NavItem eventKey={1} href={`/LogIn`}>
                                Accedi
                            </NavItem>
                            ) : (null)}
                            {!isLoggedIn ? (
                            <NavItem eventKey={2} href={`/SignUp`}>
                                Registrazione
                            </NavItem>                            ) : (null)}


                            <NavItem eventKey={3} href={`/Servizi`}>
                                Servizi
                            </NavItem>
                            {isLoggedIn ? (

                            <NavItem eventKey={4} href={`/Prodotti`}>
                                Prodotti
                            </NavItem>
                            ) : (null)}
                            {isLoggedIn ? (

                            <NavItem eventKey={5} href="#" onClick={(event) => this.logoutHandler(event)}>
                                LogOut
                            </NavItem>
                            ) : (null)}

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

            </div>
        );


    }

}

export default NavBar;
// export default withRouter(NavBar);

