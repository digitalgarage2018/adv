import React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export const NavBar = () => {
    return (
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
            <Link to={`/Servizi`}>Servizi</Link>
            </NavItem>
            <NavItem eventKey={2} href="#">
            <Link to={`/LogIn`}>Accedi</Link>
            </NavItem>
            <NavItem eventKey={3} href="#">
            <Link to={`/SignUp`}>Registrazione</Link>
            </NavItem>
                <NavItem eventKey={3} href="#">
                    <Link to={`/Servizi`}>Servizi</Link>
                </NavItem>
                <NavItem eventKey={3} href="#">
                    <Link to={`/Prodotti`}>Prodotti</Link>
                </NavItem>
                <NavItem eventKey={3} href="#">
                   LogOut
                </NavItem>


            </Nav>
        </Navbar.Collapse>
        </Navbar>

)
}; 


// import React from 'react';
// import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
// import {Link} from 'react-router-dom';

// export const NavBar = () => {
//     return (
//         <Navbar>
//             <Navbar.Header>
//                 <Navbar.Brand>
//                     <h4>My first App</h4>
//                 </Navbar.Brand>
//             </Navbar.Header>
//             <Nav>
//                 <NavItem eventKey={1} href="#">
//                     <Link to={`/`}>FIRST</Link>
//                 </NavItem>
//                 <NavItem eventKey={2} href="#">
//                     <Link to={`/second`}>SECOND</Link>
//                 </NavItem>
//             </Nav>
//         </Navbar>
//     )
// };