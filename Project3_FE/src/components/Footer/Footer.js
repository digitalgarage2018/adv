import React from 'react';
import './Footer.css';

export const Footer = () => {
    /**
     * INLINE STYLE
     * @type {{backgroundColor: string, borderTop: string, textAlign: string, padding: string, position: string, left: string, bottom: string, height: string, width: string}}
     */
    let style = {
        backgroundColor: "#F8F8F8",
        borderTop: "1px solid #E7E7E7",
        textAlign: "center",
        padding: "20px",
        position: "fixed",
        left: "0",
        bottom: "0",
        height: "60px",
        width: "100%",
    };

    let phantom = {
        display: 'block',
        padding: '20px',
        height: '60px',
        width: '100%',
    };

    return (
        <div>
            <div style={phantom}/>
            <div style={style}>
                This is a footer
            </div>
        </div>


    )
};