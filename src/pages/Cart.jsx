import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  const loadCart = () => {
    try {
      const items = JSON.parse(localStorage.getItem("bytecart_items") || "[]");
      setCartItems(Array.isArray(items) ? items : []);
    } catch (e) {
      setCartItems([]);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const saveCart = (items) => {
    setCartItems(items);
    localStorage.setItem("bytecart_items", JSON.stringify(items));
    window.dispatchEvent(new Event("storage"));
  };

  const updateQuantity = (id, change) => {
    const updated = cartItems
      .map((item) => {
        if (item._id === id) {
          const newQty = (Number(item.quantity) || 1) + change;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter(Boolean);

    saveCart(updated);
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item._id !== id);
    saveCart(updated);
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * (Number(item.quantity) || 1),
    0
  );
  const deliveryFee = subtotal > 999 || subtotal === 0 ? 0 : 49;
  const grandTotal = subtotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px" }}>
          Your ByteCart is empty 🛒
        </h2>
        <p style={{ color: "#64748b", marginBottom: "20px" }}>
          Aapke cart me abhi koi item nahi hai.
        </p>
        <Link
          to="/"
          style={{
            background: "#2563eb",
            color: "#ffffff",
            padding: "10px 20px",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "700",
          }}
        >
          Shopping Shuru Karo
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "800", marginBottom: "20px" }}>
        Shopping Cart ({cartItems.length} items)
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {cartItems.map((item) => (
            <div
              key={item._id}
              style={{
                display: "flex",
                gap: "16px",
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                padding: "14px",
                alignItems: "center",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{ width: "90px", height: "90px", objectFit: "cover", borderRadius: "8px" }}
              />

              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: "16px", fontWeight: "700", margin: "0 0 4px" }}>
                  {item.title}
                </h3>
                <div style={{ fontSize: "16px", fontWeight: "800", color: "#2563eb", marginBottom: "10px" }}>
                  ₹{item.price}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <button
                    onClick={() => updateQuantity(item._id, -1)}
                    style={{ padding: "4px 10px", cursor: "pointer", fontWeight: "bold" }}
                  >
                    -
                  </button>
                  <span style={{ fontWeight: "700" }}>{item.quantity || 1}</span>
                  <button
                    onClick={() => updateQuantity(item._id, 1)}
                    style={{ padding: "4px 10px", cursor: "pointer", fontWeight: "bold" }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item._id)}
                    style={{ marginLeft: "14px", color: "#ef4444", background: "none", border: "none", cursor: "pointer" }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "20px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "14px" }}>Price Details</h2>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span>Price</span>
            <span>₹{subtotal}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span>Delivery</span>
            <span style={{ color: deliveryFee === 0 ? "#16a34a" : "#000" }}>
              {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
            </span>
          </div>
          <hr style={{ margin: "12px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "18px", fontWeight: "800", marginBottom: "18px" }}>
            <span>Total</span>
            <span>₹{grandTotal}</span>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            style={{
              width: "100%",
              padding: "12px",
              background: "#2563eb",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              fontWeight: "700",
              fontSize: "15px",
              cursor: "pointer",
            }}
          >
            Proceed to Buy ({cartItems.length} items)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;