import React from 'react';
import {loginService} from '../../services/LoginService/LoginService';


export default class ServicesPage extends React.Component {
    constructor() {
        super();
        this.catchOutput = this.catchOutput.bind(this);
        
    }

    componentDidMount(){
        loginService();
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
                <h1> sono sulla PAGINA DEI SERVIZI </h1>
                
            </div>
        )
    }
}