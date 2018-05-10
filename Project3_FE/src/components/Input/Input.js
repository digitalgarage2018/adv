import PropTypes from 'prop-types'
import React from 'react';

export const Input = props => {
    return (
        <input type={props.type} onChange={props.customOnChange}/>
    )
};

Input.propTypes = {
    customOnChange: PropTypes.func,
    type: PropTypes.string
};