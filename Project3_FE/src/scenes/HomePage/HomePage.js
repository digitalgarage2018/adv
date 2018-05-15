import React, { Component } from 'react';
import {HomeComponent} from '../HomePage/components/HomeComponent';



class HomePage extends Component {



    state = {
        isLogged: false
    }






    render() {
        console.log('stato auth dentro home page', this.props.foo);

        return (
                <div>
                    <HomeComponent />
                </div>

        )
    }
};

export default HomePage;