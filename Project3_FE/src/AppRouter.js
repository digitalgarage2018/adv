import React from 'react';
import {Route } from 'react-router-dom';

import HomePage from "./scenes/HomePage/HomePage";
import SignupPage from "./scenes/SignUpPage/SignupPage";
import LogInPage from "./scenes/LogInPage/LogInPage";
import ServicesPage from "./scenes/ServicesPage/ServicesPage";
import ProductsPage from "./scenes/ProductsPage/ProductsPage";


export const AppRouter = (props) => {


    console.log('Utente loggato?', props.isLogged);


        return (

            <div>
                <Route exact path="/" component={HomePage}/>
                <Route path="/LogIn" render={()=><LogInPage foo={props.isLogged}/>}/>
                <Route path="/SignUp" component={SignupPage}/>
                <Route path="/Servizi" component={ServicesPage}/>
                <Route path="/Prodotti" component={ProductsPage}/>
            </div>
        )



    }



