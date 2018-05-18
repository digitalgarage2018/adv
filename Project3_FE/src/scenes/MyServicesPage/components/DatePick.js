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
        console.log('prova url', url);
        axios.get(url)
            .then( response => {

                    console.log('res', response);
                    console.log('res.DATA:', response.data);
                    console.log('ARRAY:', response.data.response);
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
        console.log('ARRAAAAAAY ',arry);
        console.log('DATA DUE',arry[0]);


        return (
            <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
                minDate={moment()}
                maxDate={moment().add(5, "months")}
                showDisabledMonthNavigation
                excludeDates={arry}

            />

        );
    }
}

export default DatePick