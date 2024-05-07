import React, { useState, useEffect, createContext } from 'react';

const cartContext = createContext();

const CartStateProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
    setCartCount(cartItems.length + 1);
  };

  return (
    <cartContext.Provider value={{ cartItems, cartCount, addToCart }}>
      {children}
    </cartContext.Provider>
  );
};

export { cartContext, CartStateProvider };
