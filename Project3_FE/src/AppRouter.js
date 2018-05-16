import React from 'react';
import {Route } from 'react-router-dom';

import HomePage from "./scenes/HomePage/HomePage";
import SignupPage from "./scenes/SignUpPage/SignupPage";
import LogInPage from "./scenes/LogInPage/LogInPage";
import ServicesPage from "./scenes/ServicesPage/ServicesPage";
import ProductsPage from "./scenes/ProductsPage/ProductsPage";
import LogOutPage from "./scenes/LogOutPage/LogOutPage";


export const AppRouter = (props) => {



    return (

            <div onChange={props.changed}>
                <Route exact path="/" component={HomePage}/>
                <Route path="/LogIn" render={()=><LogInPage/>}/>
                <Route path="/SignUp" component={SignupPage}/>
                <Route path="/Servizi" component={ServicesPage}/>
                <Route path="/Prodotti" component={ProductsPage}/>
                <Route path="/LogOut" component={LogOutPage}/>

            </div>
        )

    }



