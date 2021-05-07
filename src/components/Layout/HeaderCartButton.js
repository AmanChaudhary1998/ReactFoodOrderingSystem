import React, { useContext,useEffect, useState } from 'react';

import CartIcon from '../Cart/CartIcon';
import CartContext from '../store/cart-context';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) =>{
    
    const [btnHighted,setBtnHighlighted] = useState(false)

    const cartCtx = useContext(CartContext);

    const numberOfCartItem = cartCtx.items.reduce((currentNum,item)=>{
        return(
            currentNum + item.amount
        );
    },0);
    const {items} = cartCtx;

    useEffect(() =>{
        if(items.length===0)
        {
            return;
        }
        setBtnHighlighted(true);

        const timer = setTimeout(()=>{
            setBtnHighlighted(false);
        },300);

        return (
            ()=>{
                clearTimeout(timer)
            }
        )

    },[items]);

    const btnClasses = `${classes.button} ${btnHighted?classes.bump:''}`

    return (
        <>
        <button className={btnClasses} onClick={props.onCartButton} >
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItem} </span>
        </button>
        </>
    )
}

export default HeaderCartButton;