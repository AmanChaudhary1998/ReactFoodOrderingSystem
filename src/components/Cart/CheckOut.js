import React, { useRef, useState } from 'react';

import classes from './Checkout.module.css';

const CheckOut = (props) =>{

    const [formInputValid,setFormInputValid] = useState({
        name:true,
        street:true,
        postal:true,
        city:true
    });

    const inputNameRef = useRef();
    const inputStreetRef = useRef();
    const inputPostalRef = useRef();
    const inputCityRef = useRef();

    const isEmpty = (value) =>{
        return value.trim() === '';
    };

    const isFiveChar = (value) =>{
        return value.trim().length === 5;
    };

    const confirmHandler = (event) =>{
        event.preventDefault(); 

        const enteredName = inputNameRef.current.value;
        const enteredStreet = inputStreetRef.current.value;
        const enteredPostal = inputPostalRef.current.value;
        const enteredCity = inputCityRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);

        const enteredPostalIsValid = isFiveChar(enteredPostal);

        setFormInputValid({
            name:enteredNameIsValid,
            street:enteredStreetIsValid,
            postal:enteredPostalIsValid,
            city:enteredCityIsValid
        });

        const formValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalIsValid;

        console.log(formValid);

        if(!formValid)
        {
            return;
        }

        props.onConfirm({
            name:enteredName,
            street:enteredStreet,
            postal:enteredPostal,
            city:enteredCity
        });
    }

    return (
        <>
        <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${formInputValid.name?'':classes.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' ref={inputNameRef} id='name' />
        {!formInputValid.name && <p>Name field cannot be empty</p>}
      </div>
      <div className={`${classes.control} ${formInputValid.street?'':classes.invalid}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' ref={inputStreetRef} id='street' />
        {!formInputValid.street && <p>Street field cannot be empty</p>}
      </div>
      <div className={`${classes.control} ${formInputValid.postal?'':classes.invalid}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' ref={inputPostalRef} id='postal' />
        {!formInputValid && <p>Postal code must be 5 char </p>}
      </div>
      <div className={`${classes.control} ${formInputValid.city?'':classes.invalid}`}>
        <label htmlFor='city'>City</label>
        <input type='text' ref={inputCityRef} id='city' />
        {!formInputValid && <p>City field cannot be empty</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
        </>
    )
}

export default CheckOut;