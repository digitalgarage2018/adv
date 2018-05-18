import React, { Component } from "react";

import { Button } from "react-bootstrap";
import {axiosinstance} from "../../components/AxiosInstance/AxiosInstance";

let aligns={

    textAlign: 'center',
    padding:'50px'
};
let btnspacetop = {
    marginTop:'30px'
};

let btncolor = {
    background:'#222222'
};

let btnspace = {
    marginLeft: '20px',
    background:'#222222'

};


class logOutPage extends Component {

    logoutHandler = () => {

        let instance = axiosinstance();
        instance.get('http://localhost:8070/logout')
            .then(response => {
                sessionStorage.setItem('isLogged','false');
                sessionStorage.setItem('isCenter','false');
                sessionStorage.setItem('jwt','');


                this.props.history.push("/");

                window.location.reload();

            })
            .catch(error => {
                console.log(error);
                if (error.response === undefined) {
                    this.setState({message: "Ci dispiace ma qualcosa è andato storto... riprova più tardi!"})
                }

                else if (error.response.data.server === 403) {
                    this.setState({message: "Credenziali non corrette"})
                }


                else if (error.response.data.server === 0) {
                    this.setState({message: "Ci dispiace ma qualcosa è andato storto... riprova più tardi!"})
                }

            });
    };


    render() {

            return (
                <div  style={aligns}>

                    <h3>Vuoi davvero uscire?</h3>
                    <div style={btnspacetop}>
                    <Button style={btncolor} bsStyle="primary" bsSize="large"  onClick={()=> {this.props.history.push("/")}
                    }> No </Button>
                    <Button  style={btnspace}  bsStyle="primary" bsSize="large"  onClick={this.logoutHandler}> Si!
                    </Button>
                    </div>

                </div>
            );
    }
}

export default logOutPage;
