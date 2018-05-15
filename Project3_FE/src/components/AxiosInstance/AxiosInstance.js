import React from 'react';
import axios from 'axios';


export const axiosinstance = () => {


    let instance = axios.create();
    instance.defaults.headers.common['jwt'] = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJHYXp6dSIsImV4cCI6MTUyNjM5Mjg5NCwibmFtZSI6IlNpbHZpYSIsInNjb3BlIjoiZGVmYXVsdF91c2VyIn0.S7_Iin3AiFRQLB3V9YsuGrPAYJzV-UNkRYnXdFX2kqk";

    return instance;
};
