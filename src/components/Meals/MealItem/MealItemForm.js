import React, { useRef, useState } from 'react';

import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';
const MealItemForm = (props) =>{
    const [amountValid, setAmountValid] = useState(true);

    const amountInputRef = useRef();

    const submitFormHandler = (event) =>{
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount

        if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5)
        {
            setAmountValid(false);
            return;
        }
        props.onAddToCart(enteredAmountNumber);
    };

    return(
        <>
        <form className={classes.form} onSubmit={submitFormHandler}>
            <Input label="Amount"
                ref={amountInputRef}
                 input={{
                id:"amount_"+ props.id,
                type:"amount",
                min:'1',
                max:'5',
                step:'1',
                defaultValue:'1'
            }} />
            <button>+Add</button>
            {!amountValid && <p>Please Entered Valid Amount(range 1 - 5).</p>}
        </form>
        </>
    )
}

export default MealItemForm;