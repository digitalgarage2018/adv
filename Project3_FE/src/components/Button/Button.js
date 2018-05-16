import PropTypes from 'prop-types'
import './Button.css';
import React from 'react';

export const Button = (props) => {
    return <button className='red-button' onClick={props.customOnClick}>{props.title}</button>
};

Button.propTypes = {
    title: PropTypes.string,
    customOnClick: PropTypes.func
};