import React, { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    items:[],
    totalAmount:0
};

const cartReducer = (state,action) =>{
    if(action.type==="ADD")
    {
        const existingItemIndex = state.items.findIndex((item) =>{
            return(
                item.id === action.item.id
            )
        });
        const existingItem = state.items[existingItemIndex];

        let updatedItems;

        if(existingItem)
        {
            const updatedItem = {
                ...existingItem,
                amount: existingItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = updatedItem;
        } else { 
            updatedItems = state.items.concat(action.item);
        }
        const updatedTotalAmount = state.totalAmount + action.item.amount * action.item.price;

        return{
            items:updatedItems,
            totalAmount:updatedTotalAmount
        }
    }
    if(action.type==='REMOVE')
    {
        const existingItemIndex = state.items.findIndex((item) =>{
            return(
                item.id === action.id
            )
        });
        const existingItem = state.items[existingItemIndex];

        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if(existingItem.amount === 1)
        {
            updatedItems = state.items.filter((item) => item.id !== action.id);
        } else {
            const updatedItem = {...existingItem, amount:existingItem.amount -1}
            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount:updatedTotalAmount
        };
    }
    if(action.type==="CLEAR")
    {
        return defaultCartState;
    }
    return( defaultCartState );
}

const CartProvider = (props) =>{
    const [cartState,dispatchCart] = useReducer(cartReducer, defaultCartState);

    const addItemHandler = (item) => {
        dispatchCart({type:"ADD", item:item});
    };

    const removeItemHandler = (id) => {
        dispatchCart({type:"REMOVE", id:id});
    }

    const cartClearHandler = () =>{
        dispatchCart({type:"CLEAR"});
    }

    const cartContext = {
        items:cartState.items,
        totalAmount:cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        clearCart: cartClearHandler
    }
    return(
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;