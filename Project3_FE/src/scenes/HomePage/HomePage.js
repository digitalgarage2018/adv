import React from 'react';
import {loginService} from '../../services/LoginService/LoginService';
import {HomeComponent} from '../HomePage/components/HomeComponent';



class HomePage extends React.Component {


    render() {
        return (
                <div>
                    <HomeComponent />
                </div>

        )
    }
};

export default HomePage;