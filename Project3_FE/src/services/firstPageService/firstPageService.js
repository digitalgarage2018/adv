import axios from 'axios';

export const contactBackend = () => {


    return axios.post('http://localhost:8070/login', {
        u_username: 'admin',
        u_pword: 'admin'
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });



}



