import React from 'react';
import {Button} from "../../../components/Button/Button";
import {Input} from "../../../components/Input/Input";

import image from '../../../images/home.jpg';

export const HomeComponent = (props) => {

    const onClick = () => {
        console.log(this);
    };

    const outputToFather = (e) => {
        props.output(e);
    };

    return (
        <div>

        <img src={image} />
        </div>
    )
};

/*
return (

    <div>
        <Button title='example' customOnClick={() => onClick()}/>
        <Input type='text' customOnChange={(e) => outputToFather(e)}/>
    </div>
)
*/