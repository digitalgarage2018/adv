import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class DatePick extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            startDate: moment(),
            sendDate: moment()

        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        let a = date.format();
        let b = a.substring(0,10);

        this.setState({
            startDate: date,
            sendDate: b

    });
        console.log(a);
        console.log(b);
    }

    render() {



        return (

        <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
        />

        );
    }
}

export default DatePick