import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import axios from "axios/index";

class DatePick extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            startDate: moment(),
            sendDate: moment(),
            dates: []
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        console.log('Sto facendo la chiamata ai servizi...');
        let url = 'http://localhost:8091/getDate/'+ this.props.serviceID;
        axios.get(url)
            .then( response => {

                this.setState({dates: response.data.response});
                }

            )
            .catch(error => {
                this.setState({message: "Ci dispiace ma qualcosa è andato storto... riprova più tardi!"})
            });

    }

    handleChange(date) {
        let a = date.format();
        let b = a.substring(0,10);
        sessionStorage.setItem("date",b);
        this.setState({
            startDate: date,
            sendDate: b

    });

    }

    render() {

        let arry= [];

        for (let i=0;i<(this.state.dates.length);i++){
            let tmp = this.state.dates[i];
            arry.push(moment(tmp));
        }


        return (
        <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            minDate={moment()}
            maxDate={moment().add(5, "months")}
            excludeDates={arry}
            placeholderText="Scegli una data"

        />

        );
    }
}

export default DatePick