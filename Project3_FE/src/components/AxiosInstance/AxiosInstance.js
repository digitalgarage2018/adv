import axios from 'axios';


export const axiosinstance = () => {


    let instance = axios.create();
    instance.defaults.headers.common['jwt'] = window.sessionStorage.getItem('jwt');


    return instance;
};