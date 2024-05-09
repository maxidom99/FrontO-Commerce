import React, { useState, useEffect, createContext } from 'react';

const cartContext = createContext();

const CartStateProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });
   const [cartCount, setCartCount] = useState(() => {
    const storedCartCount = localStorage.getItem('cartCount');
    return storedCartCount ? parseInt(storedCartCount) : 0;
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

    useEffect(() => {
    localStorage.setItem('cartCount', cartCount.toString());
  }, [cartCount]);

  const addToCart = (item) => {
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems]
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems)
    } else {
      
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
    setCartCount(cartCount + 1)
  };

  return (
    <cartContext.Provider value={{ cartItems, cartCount, addToCart }}>
      {children}
    </cartContext.Provider>
  );
};

export { cartContext, CartStateProvider };
