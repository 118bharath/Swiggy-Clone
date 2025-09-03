import React, {createContext, useState, useContext} from 'react';

const CartContext=createContext(null);

export const CartProvider=({children})=>{
    const [cartItems, setCartItems]=useState([]);

    const addToCart=(item)=>{
        setCartItems((prevItems)=>{
            const isItemInCart=prevItems.find((cartItem)=>cartItem._id===item._id);

            if (isItemInCart){
                return prevItems.map((cartItem)=> cartItem._id===item._id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem)
            }

            return [...prevItems, {...item,quantity:1}];
        })
    }

    const removeFromCart=(itemId)=>{
        setCartItems((prevItems)=>prevItems.filter((item)=>item._id!==itemId));
    }

    const updateQuantity=(itemId,quantity)=>{
        if (quantity <=0){
            removeFromCart(itemId);
        }else{
            setCartItems((prevItems)=> prevItems.map((item)=> item._id === itemId ? {...item, quantity: quantity} : item))
        }
    };

    const value={
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};

export const useCart=()=>{
    return useContext(CartContext);
}