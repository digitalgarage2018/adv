import React, {Component} from 'react';
import {AppRouter} from "./AppRouter";
import NavBar from "./components/Navbar/Navbar";
import {Footer} from "./components/Footer/Footer";

import LogoutModal from "./components/LogoutModal/LogoutModal";


class App extends Component {

    /*state = {
      showModal: false
  }

showModalHandler(){
      this.setState({showModal: true});
  }

  closeModalHandler(){
      this.setState({showModal: false})
  }*/


    render() {
        return (
            <div>
                <NavBar/>

                <AppRouter/>
                <Footer/>

            </div>

        );
    }
}

export default App;
