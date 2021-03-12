import React from 'react';

export default function Footer() {
    let footerStyle = {
        padding: '18px 0 ',
        textAlign: 'center',
        backgroundColor: '#e4bcd7',
        margin: '0',
        fontWeight: '400',
        fontSize: '13px',
    }

    let footerContainer = {
        display: 'flex',
        backgroundColor: '#e4bcd7',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '10px',
        bottom: '0',
        position: 'absolute',
        overflow: 'hidden',
        width: '100%',
        height: '40px',
        marginBottom: '15px',
    }

    let date = new Date();
    let currentYear = date.getFullYear();

    return (
        <div style={footerContainer}>
            <p style={footerStyle}>Created by Sam's Cakes &copy; {currentYear}</p>
        </div>
    )
}