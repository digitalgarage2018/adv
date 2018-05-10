import React from 'react';
import {Route, Router } from 'react-router-dom';

import HomePage from "./scenes/HomePage/HomePage";
import SignUpPage from "./scenes/SignUpPage/SignUpPage";
import LogInPage from "./scenes/LogInPage/LogInPage";
import ServicesPage from "./scenes/ServicesPage/ServicesPage";
import ProductsPage from "./scenes/ProductsPage/ProductsPage";


export const AppRouter = () => {
    return (
        <div>
            <Route exact path="/" component={HomePage}/>
            <Route path="/LogIn" component={LogInPage}/>
            <Route path="/SignUp" component={SignUpPage}/>
            <Route path="/Servizi" component={ServicesPage}/>
            <Route path="/Prodotti" component={ProductsPage}/>

        </div>
    )
};