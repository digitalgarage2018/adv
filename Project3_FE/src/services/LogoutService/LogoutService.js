import axios from 'axios';

export const logout = () => {


    return axios.post('http://localhost:8070/logout', {
        headers: {
            'jwt': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTUyNTk2MzA2MywibmFtZSI6ImFjaGlsbGUiLCJzY29wZSI6ImRlZmF1bHRfdXNlciJ9.Qpfob3J1N_QGzvQ_TSrEet7fjJh_U33SNqok_BKK3kA'
        }})
        .then(function (response) {
            console.log(response);


        })
        .catch(function (error) {
            console.log(error);
        });



}


