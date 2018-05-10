import React from 'react';
import {loginService} from '../../services/LoginService/LoginService';
import {HomeComponent} from '../HomePage/components/HomeComponent';

export default class HomePage extends React.Component {
    constructor() {
        super();
        this.catchOutput = this.catchOutput.bind(this);
        
    }


    state = {
        showOutput: ''
    }

    catchOutput(e) {
        console.log(e.target.value);
        this.setState({
            showOutput: e.target.value
        })
    }


    render() {
        return (
            <div>
                <HomeComponent />
            </div>
        )
    }
}