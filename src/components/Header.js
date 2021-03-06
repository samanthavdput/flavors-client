import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/logo.png';

export default function Header() {
    return (
        <>
            <div className='header-div' >
                <div className='header-title-parent'>
                    <h1 className='header-div-title'>Flavors</h1>
                </div>
                <div className='header-teaser row'>
                    <div className='text-teaser-div col-4'>
                        <h1 className='teaser-title'>Sam's Cakes Ajaccio <br /> Flavors of the week</h1>
                        <p className='teaser-par'>Tool to plan this week's cupcakes <br /> and get all the recipes</p>
                        {/* <Link to='/login'>
                            <button className='login-btn btn btn-lg'>Login page</button>
                        </Link> */}
                    </div>
                    <div className='header-img-div col-3'>
                        <img src={Logo} alt='background-img' className='header-img' />
                    </div>
                </div>
            </div>
        </>
    )
}