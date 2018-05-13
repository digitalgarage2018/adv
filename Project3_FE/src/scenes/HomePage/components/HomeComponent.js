import React from 'react';
import {Image} from 'react-bootstrap';

import image from '../../../images/home.jpg';

export const HomeComponent = () => {

    return (
        <Image src={image} responsive />
    )
};