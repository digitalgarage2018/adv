import React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import { AuthConsumer } from '../../AuthContext';
import './Navbar.css';

export const NavBar = (props) => {

    return (

        <AuthConsumer>
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

                        <NavItem eventKey={1} href={`/LogIn`}>
                            Accedi
                        </NavItem>

                        <NavItem eventKey={2} href={`/SignUp`}>
                           Registrazione
                        </NavItem>
                        {isAuth ? (

                        <NavItem eventKey={3} href={`/Servizi`}>
                            Servizi
                        </NavItem>

                         ) : (
                        <NavItem eventKey={4} href={`/Prodotti`}>
                            Prodotti
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

