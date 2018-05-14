import React, {Component} from 'react';
import {AppRouter} from "./AppRouter";
import NavBar from "./components/Navbar/Navbar";
import {Footer} from "./components/Footer/Footer";



class App extends Component {

    state = {
        authenticated: false
    }

    render() {
        return (
                <div>
                    <NavBar isLogged={this.state.authenticated} />

                    <AppRouter isLogged={this.state.authenticated}/>

                    <Footer/>

                </div>
        );
    }
}

export default App;
