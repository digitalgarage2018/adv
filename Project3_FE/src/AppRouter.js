import React from 'react';
import {Route } from 'react-router-dom';

import HomePage from "./scenes/HomePage/HomePage";
import SignupPage from "./scenes/SignUpPage/SignupPage";
import LogInPage from "./scenes/LogInPage/LogInPage";
import ServicesPage from "./scenes/ServicesPage/ServicesPage";
import ProductsPage from "./scenes/ProductsPage/ProductsPage";
import LogOutPage from "./scenes/LogOutPage/LogOutPage";
import CenterLogInPage from './scenes/CenterLogInPage/CenterLogInPage';
import AddServicePage from './scenes/AddServicePage/AddServicePage';
import MyServicesPage from './scenes/MyServicesPage/MyServicesPage';
import EditService from './scenes/EditServicePage/EditServicePage';




export const AppRouter = (props) => {



    return (

            <div onChange={props.changed}>
                <Route exact path="/" component={HomePage}/>
                <Route path="/LogIn" render={()=><LogInPage/>}/>
                <Route path="/WellnessCenterLogIn" render={()=><CenterLogInPage/>}/>
                <Route path="/SignUp" component={SignupPage}/>
                <Route path="/Servizi" component={ServicesPage}/>
                <Route path="/Prodotti" component={ProductsPage}/>
                <Route path="/LogOut" component={LogOutPage}/>
                <Route path="/AggiungiServizio" component={AddServicePage}/>
                <Route path="/MieiServizi" component={MyServicesPage}/>
                <Route path="/ModificaServizio" component={EditService}/>

            </div>
        )

    }



