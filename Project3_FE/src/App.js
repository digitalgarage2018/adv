import React, {Component} from 'react';
import {AppRouter} from "./AppRouter";
import {NavBar} from "./components/Navbar/Navbar";
import {Footer} from "./components/Footer/Footer";

import LogoutModal from "./components/LogoutModal/LogoutModal";


class App extends Component {

    state = {
        isLogged: true,
        showModal: false
    }

    showModalHandler(){
       this.setState({showModal: true})
    }

    closeModalHandler(){
        this.setState({showModal: false})
    }


    render() {
        return (
            <div>
                <NavBar isLogged={this.state.isLogged} click={() => this.showModalHandler()}/>
                <LogoutModal
                show={this.state.showModal}
                hide={() => this.closeModalHandler()}
                />
                <AppRouter/>
                <Footer/>
            </div>

        );
    }
}

export default App;
