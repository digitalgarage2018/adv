import axios from 'axios';


export const loginService = (userData) => {

    console.log('User Data: ', userData);

    return axios.post('http://localhost:8070/login', {
        u_username: userData.email,
        u_pword: userData.password
    })
        .then(function (response) {
            console.log(JSON.stringify(response.headers));

            console.log("Responde Login: ", response.data);
            console.log("Responde Login: ", response.data);



        })
        .catch(function (error) {
            console.log(error);
        });





}



