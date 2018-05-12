import React from 'react';
import {loginService} from '../../services/LoginService/LoginService';
import {HomeComponent} from '../HomePage/components/HomeComponent';

import LogoutModal from './components/LogoutModal';


class HomePage extends React.Component {



    state = {
        showModal: false
    }

    showModalHandler() {
        this.setState({showModal: true});
    }

    closeModalHandler() {
        this.setState({showModal: false});
    }




    render() {
        return (
            <div>
                <div>
                    <HomeComponent />
                </div>
                <LogoutModal
                    show={this.showModalHandler()}
                    hide={this.closeModalHandler()}
                />
            </div>

        )
    }
};

export default HomePage;