import React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { AuthConsumer } from '../../AuthContext';
import './Navbar.css';

export const NavBar = (props) => {

    return (

        < AuthConsumer>
        {({ isAuth }) => (

                <div className="Navbar">
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
                    {isAuth ? (

                    <NavItem eventKey={3} href="#">
                        <Link to={`/Servizi`}>Servizi</Link>
                    </NavItem>

                        ) : (
                    <NavItem eventKey={4} href="#">
                        <Link to={`/Prodotti`}>Prodotti</Link>
                    </NavItem>

                        )}

            <NavItem to={`/`} eventKey={5} href="#" onClick={props.click}>
                        LogOut
                    </NavItem>


                        </Nav>
            </Navbar.Collapse>
        </Navbar>

    </div>
            )}
                        </AuthConsumer>

    )

}; 

