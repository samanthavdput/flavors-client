import React from 'react';

export default function Footer() {
    let footerStyle = {
        padding: '18px 0 ',
        textAlign: 'center',
        backgroundColor: '#e4bcd7',
        margin: '0',
        fontWeight: '400',
        fontSize: '13px'
    }

    let date = new Date();
    let currentYear = date.getFullYear();

    return (
        <>
            <p style={footerStyle}>Created by Sam's Cakes &copy; {currentYear}</p>
        </>
    )
}