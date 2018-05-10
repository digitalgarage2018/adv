import PropTypes from 'prop-types'
import React from 'react';

export const Title = props => {
    return (
        <h1>{props.title}</h1>
    )
};

Title.propTypes = {
    title: PropTypes.string
};

Title.defaultProps = {
    title: 'This is a default title'
};