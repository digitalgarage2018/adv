import React from 'react';
import {contactBackend} from '../../services/firstPageService/firstPageService';


export default class ProductsPage extends React.Component {
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
                <h1> sono SUI PRODOTTI  </h1>
                
            </div>
        )
    }
}