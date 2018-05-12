import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import { AuthProvider } from './AuthContext';


ReactDOM.render(
    <BrowserRouter>
        <AuthProvider>
        <App/>
        </AuthProvider>

    </BrowserRouter>,
    document.getElementById('root'));
registerServiceWorker();
