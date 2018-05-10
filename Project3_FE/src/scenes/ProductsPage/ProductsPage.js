import React from 'react';
import {productsService} from '../../services/productsPageService/productsPageService';


export default class ProductsPage extends React.Component {
    constructor() {
        super();
        this.catchOutput = this.catchOutput.bind(this);
        
    }

    componentDidMount(){
        productsService();
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