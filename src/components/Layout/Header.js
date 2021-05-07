import React from 'react';

import classes from './Header.module.css';

import mealImage from '../assests/meals.jpg';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) =>{
    return(
        <>
        <header className={classes.header}>
            <h1>Meals</h1>
            <HeaderCartButton onCartButton = {props.onShowCart} />
        </header>
        <div className={classes['main-image']}>
            <img src={mealImage} />
        </div>
        </>
    )
}

export default Header