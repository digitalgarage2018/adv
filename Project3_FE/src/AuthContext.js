import React, {Component} from 'react'
import axios from "axios/index";

const AuthContext = React.createContext()

class AuthProvider extends Component {
    state = {
        isAuth: false,
        jwt: ""
    }


    login = (event, username, password) => {
        event.preventDefault();
        console.log('sono qui desntro');
        axios.post('http://localhost:8070/login', {
            u_username: username,
            u_pword: password
        })
            .then( response => {
                console.log(response);
                console.log(this.state);
                this.setState({ isAuth: true });
                this.setState({jwt: response.headers.jwt});
                console.log(this.state);
                // this.props.history.push("/");

            })
            .catch( error => {
                console.log(error);

            });



    }

    logout() {
        this.setState({ isAuth: false })
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
