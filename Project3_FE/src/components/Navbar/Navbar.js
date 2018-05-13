import React, { Component } from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import { AuthConsumer } from '../../AuthContext';
import './Navbar.css';


class NavBar extends Component {

    render() {
        return (

            <AuthConsumer>
                {({isAuth, logout}) => (

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

                {isAuth ? (
                                        <NavItem to={`/`} eventKey={5} href="#" onClick={logout}>
                                            LogOut
                                        </NavItem>
                ) : null}
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>

                    </div>
                )}
            </AuthConsumer>

        );


}
}

export default NavBar;
