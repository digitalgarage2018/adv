import axios from 'axios';

export const productsService = () => {


    return axios.get('http://localhost:8091/products/')
        .then( response => {

            console.log(response.data)
            }
        )
        .catch(function (error) {
            console.log(error);
        });



}
