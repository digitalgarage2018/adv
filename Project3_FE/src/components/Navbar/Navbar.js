import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';


let margin ={
    marginBottom:'0px'
};

class NavBar extends Component {


    state = {
        isLogged: sessionStorage.getItem('isLogged'),
        message: ""
    };

    render() {
        const isLoggedIn = (this.state.isLogged === "true");
        console.log('this.state.isLogged', this.state.isLogged);
        console.log('isLoggedIn', isLoggedIn);
        return (
            <div className="Navbar">
                <Navbar style={margin} inverse collapseOnSelect>
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

                            <NavItem eventKey={5} href={'/Logout'}>
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

