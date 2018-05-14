import React, {Component} from 'react';

import axios from "axios";


const AuthContext = React.createContext()

class AuthProvider extends Component {

    state = {
        isAuth: false,
        jwt: "",
        message: ""
    }


    login = () => {
        this.setState({isAuth: true});
    }

    logout = () => {
        this.setState({ isAuth: false });
    }


    render() {
        return (
            <AuthContext.Provider
                value={{
                    isAuth: this.state.isAuth,
                    login: this.login,
                    logout: this.logout
                }}
            >
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer }
