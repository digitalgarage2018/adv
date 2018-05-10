import React from 'react';
import {contactBackend} from '../../services/firstPageService/firstPageService';
import {HomeComponent} from '../HomePage/components/HomeComponent';

export default class HomePage extends React.Component {
    constructor() {
        super();
        this.catchOutput = this.catchOutput.bind(this);
        
    }

    componentDidMount(){
        contactBackend();
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