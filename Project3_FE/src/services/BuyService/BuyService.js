import axios from 'axios';
import React from 'react';
import DatePicker from '../../scenes/ServicesPage/components/DatePick'
export const buyService = (userData) => {

    return axios.post('http://localhost:8070/login', {
        date: userData.userName,
        id: userData.password
    })
        .then(function (response) {
            console.log("Responde Login: ", response.data);
            console.log("Responde Header: ", response.headers);
            console.log("Responde jwt prova: ", response.headers.jwt);
        })
        .catch(function (error) {
            console.log(error);
        });

};

