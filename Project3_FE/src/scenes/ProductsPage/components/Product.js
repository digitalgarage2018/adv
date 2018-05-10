import React from 'react';


const Product = (props) => {
    return <button className='red-button' onClick={props.customOnClick}>{props.title}</button>
};

export default Product;



