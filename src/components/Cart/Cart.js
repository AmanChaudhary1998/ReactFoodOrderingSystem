import React, { useContext, useState } from 'react';

import CartContext from '../store/cart-context';
import Modal from '../UI/Modal';

import classes from './Cart.module.css';
import CartItem from './CartItem';
import CheckOut from './CheckOut';

const Cart = (props) =>{

    const [isSubmitting,setIsSubmitting] = useState(false);

    const [didSubmit, setDidSubmit] = useState(false);

    const [isCheckout,setIsCheckout] = useState(false);

    const addHandler = (item) =>{
        cartCtx.addItem({...item,amount:1});
    }

    const removeHandler = (id) =>{
        cartCtx.removeItem(id);
    }

    const cartCtx = useContext(CartContext);

    const confirmOrderHandler = async (userData) =>{
        setIsSubmitting(true);
        await fetch('https://reactproject-3753e-default-rtdb.firebaseio.com/orders.json',{
            method:'POST',
            body:JSON.stringify({
                user:userData,
                orderitems:cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    }

    const cartItem = (<ul className={classes['cart-items']}>{cartCtx.items.map((item)=>(
        <CartItem key={item.id} name={item.name} price={item.price} amount={item.amount} onAdd={addHandler.bind(null,item)} onRemove={removeHandler.bind(null,item.id)} />
    )
    )}</ul>);

    const totalAmount = `Rs.${cartCtx.totalAmount.toFixed(2)}`;

    const hasItem = cartCtx.items.length>0;

    const orderHandler = () =>{
        setIsCheckout(true);
    }

    const modelActions = <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
        {hasItem && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>

    const cartModalContent = 
        <>
                {cartItem}
                <div>
                    <span className={classes.total}>Total Amount</span>
                    <span>{totalAmount}</span>
                </div>
                {isCheckout && <CheckOut onConfirm={confirmOrderHandler} onCancel={props.onHideCart} />}
                {!isCheckout && modelActions}
    </>

    const isSubmittingModalContent = 
    <>
    <p>Sending the data successfully...</p>
    
    </>

    const didSubmitModelContent = 
    <>
    <p>Succesfully send the data</p>
    <button className={classes.button} onClick={props.onHideCart}>Close</button>
    </>

    return(
        <Modal onClick={props.onHideCart}>
        {!isSubmitting && !didSubmit && cartModalContent}
        {isSubmitting && isSubmittingModalContent}
        {!isSubmitting && didSubmit && didSubmitModelContent}
        </Modal>
    )
}

export default Cart;