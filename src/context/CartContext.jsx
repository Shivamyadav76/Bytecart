import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("bytecart_items");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem("bytecart_orders");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Jab bhi cart change ho, localStorage me update karo
  useEffect(() => {
    localStorage.setItem("bytecart_items", JSON.stringify(cart));
  }, [cart]);

  // Jab bhi orders change ho, localStorage me update karo
  useEffect(() => {
    localStorage.setItem("bytecart_orders", JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item._id === product._id);
      if (exists) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: (Number(item.quantity) || 1) + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, change) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item._id === id) {
            const newQty = (Number(item.quantity) || 1) + change;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("bytecart_items");
  };

  const placeOrder = (orderData) => {
    const updated = [orderData, ...orders];
    setOrders(updated);
    localStorage.setItem("bytecart_orders", JSON.stringify(updated));
    clearCart();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);