import React, { createContext, useContext, useState } from 'react';

export const CartContext = createContext();

export const useCartContext = () => {
    return useContext(CartContext);
};

export default function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        const jsonCart = localStorage.getItem('cart');
        return jsonCart ? JSON.parse(jsonCart) : [];
    });

    const addToCart = (product) => {
        const itemIdx = cartItems.findIndex((item) => item.id === product.id);
        const updatedItems = [...cartItems];
        if (itemIdx === -1) {
            updatedItems.push({ ...product, qty: 1 });
        } else {
            updatedItems[itemIdx].qty += 1;
        }
        setCartItems(updatedItems);
        localStorage.setItem('cart', JSON.stringify(updatedItems));
    };

    const removeFromCart = (product) => {
        const filteredItems = cartItems.filter((item) => item.id !== product.id);
        setCartItems(filteredItems);
        localStorage.setItem('cart', JSON.stringify(filteredItems));
    };

    const increaseQty = (idx) => {
        const updatedItems = [...cartItems];
        updatedItems[idx].qty += 1;
        setCartItems(updatedItems);
        localStorage.setItem('cart', JSON.stringify(updatedItems));
    };

    const decreaseQty = (idx) => {
        const updatedItems = [...cartItems];
        if (updatedItems[idx].qty > 1) {
            updatedItems[idx].qty -= 1;
            setCartItems(updatedItems);
            localStorage.setItem('cart', JSON.stringify(updatedItems));
        } else {
            removeFromCart(updatedItems[idx]);
        }
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.clear();
    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, increaseQty, decreaseQty, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}
