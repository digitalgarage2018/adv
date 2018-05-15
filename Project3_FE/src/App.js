import React, {Component} from 'react';
import {AppRouter} from "./AppRouter";
import NavBar from "./components/Navbar/Navbar";
import {Footer} from "./components/Footer/Footer";



class App extends Component {

    state = {
        authenticated: false
    }

    risaluta(){

        // this.state.authenticated =
        console.log('CIAO CIAO');
    }

    risaluta(){


        console.log('Buongiorno!');
    }

    render() {
        return (
                <div>
                    <NavBar isLogged={this.state.authenticated} changed={this.provasaluta}/>

                    <AppRouter isLogged={this.state.authenticated} changed={this.risaluta}/>

                    <Footer/>

                </div>
        );
    }
}

export default App;
