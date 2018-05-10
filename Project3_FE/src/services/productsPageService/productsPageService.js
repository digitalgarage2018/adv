import axios from 'axios';

export const productsService = () => {


    return axios.get('http://localhost:8091/products/1', {

    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });



}
