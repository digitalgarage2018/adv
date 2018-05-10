import React from 'react';
import {Image} from 'react-bootstrap';

import image from '../../../images/home.jpg';

export const HomeComponent = (props) => {

    const onClick = () => {
        console.log(this);
    };

    const outputToFather = (e) => {
        props.output(e);
    };

    return (
        <Image src={image} responsive />
    )
};