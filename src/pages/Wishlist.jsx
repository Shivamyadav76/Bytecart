import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  const loadWishlist = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("bytecart_wishlist") || "[]");
      setWishlist(Array.isArray(saved) ? saved : []);
    } catch (e) {
      setWishlist([]);
    }
  };

  useEffect(() => {
    loadWishlist();
    window.addEventListener("storage", loadWishlist);
    return () => window.removeEventListener("storage", loadWishlist);
  }, []);

  const removeItem = (id) => {
    const updated = wishlist.filter((item) => item._id !== id);
    setWishlist(updated);
    localStorage.setItem("bytecart_wishlist", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  const moveToCart = (item) => {
    let cart = [];
    try {
      cart = JSON.parse(localStorage.getItem("bytecart_items") || "[]");
    } catch (e) {}
    const idx = cart.findIndex((p) => p._id === item._id);
    if (idx !== -1) {
      cart[idx].quantity = (Number(cart[idx].quantity) || 1) + 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
    localStorage.setItem("bytecart_items", JSON.stringify(cart));
    removeItem(item._id);
    alert(`${item.title} moved to cart!`);
  };

  if (wishlist.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px", fontFamily: "Inter, sans-serif" }}>
        <div style={{ fontSize: "56px", marginBottom: "14px" }}>🤍</div>
        <h2 style={{ fontSize: "24px", fontWeight: "800", marginBottom: "8px" }}>Your Wishlist is Empty</h2>
        <p style={{ color: "#64748b", marginBottom: "20px" }}>Save your favorite gadgets and gear here for later shopping.</p>
        <Link to="/" style={{ background: "#2563eb", color: "#fff", padding: "10px 22px", borderRadius: "8px", textDecoration: "none", fontWeight: "700" }}>
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "24px auto", padding: "0 20px", fontFamily: "Inter, sans-serif" }}>
      <h1 style={{ fontSize: "26px", fontWeight: "800", marginBottom: "20px" }}>
        My Wishlist ({wishlist.length} items)
      </h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
        {wishlist.map((item) => (
          <div key={item._id} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "16px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <img src={item.image} alt={item.title} style={{ width: "100%", height: "160px", objectFit: "contain", marginBottom: "10px" }} />
              <h3 style={{ fontSize: "15px", fontWeight: "700", height: "40px", overflow: "hidden", margin: "0 0 6px" }}>{item.title}</h3>
              <div style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", marginBottom: "12px" }}>₹{item.price}</div>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => moveToCart(item)}
                style={{ flex: 1, padding: "8px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "700", cursor: "pointer", fontSize: "13px" }}
              >
                Move to Cart
              </button>
              <button
                onClick={() => removeItem(item._id)}
                style={{ padding: "8px 12px", background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: "6px", fontWeight: "700", cursor: "pointer", fontSize: "13px" }}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;