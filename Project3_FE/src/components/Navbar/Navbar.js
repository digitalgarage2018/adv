import React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import './Navbar.css';

export const NavBar = (props) => {



    if (props.isLogged) {
        return <div className="Navbar">
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/"> Super Relax</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>

                    <Nav pullRight>

                        <NavItem eventKey={3} href="#">
                            <Link to={`/Servizi`}>Servizi</Link>
                        </NavItem>
                        <NavItem eventKey={4} href="#">
                            <Link to={`/Prodotti`}>Prodotti</Link>
                        </NavItem>
                        <NavItem eventKey={5} href="#" onClick={props.click}>
                            LogOut
                        </NavItem>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        </div>
    }
    else {
        return <div className="Navbar">
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/"> Super Relax</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>

                    <Nav pullRight>

                        <NavItem eventKey={1} href="#">
                            <Link to={`/LogIn`}>Accedi</Link>
                        </NavItem>
                        <NavItem eventKey={2} href="#">
                            <Link to={`/SignUp`}>Registrazione</Link>
                        </NavItem>
                        <NavItem eventKey={3} href="#">
                            <Link to={`/Servizi`}>Servizi</Link>
                        </NavItem>
                        <NavItem eventKey={4} href="#">
                            <Link to={`/Prodotti`}>Prodotti</Link>
                        </NavItem>


                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        </div>
    }



}; 

