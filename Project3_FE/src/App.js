import React, {Component} from 'react';
import {AppRouter} from "./AppRouter";
import {NavBar} from "./components/Navbar/Navbar";
import {Footer} from "./components/Footer/Footer";


class App extends Component {

    state = {
        isLogged: true,
        showModal: false
    }

    showModalHandler(){
        console.log('Apri modale');
    }


    render() {
        return (
            <div>
                <NavBar isLogged={this.state.isLogged} click={() => this.showModalHandler()}/>
                <AppRouter/>
                <Footer/>
            </div>

        );
    }
}

export default App;
