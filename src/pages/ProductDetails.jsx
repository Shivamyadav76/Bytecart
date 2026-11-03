import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedMsg, setAddedMsg] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => String(item._id) === String(id));
        setProduct(found || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch product details error:", err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = (redirect = false) => {
    if (!product) return;
    const saved = localStorage.getItem("bytecart_items");
    let currentCart = [];
    try {
      currentCart = saved ? JSON.parse(saved) : [];
      if (!Array.isArray(currentCart)) currentCart = [];
    } catch (e) {
      currentCart = [];
    }

    const index = currentCart.findIndex((item) => item._id === product._id);
    if (index !== -1) {
      currentCart[index].quantity = (Number(currentCart[index].quantity) || 1) + quantity;
    } else {
      currentCart.push({ ...product, quantity });
    }

    localStorage.setItem("bytecart_items", JSON.stringify(currentCart));
    window.dispatchEvent(new Event("storage"));

    if (redirect) {
      navigate("/cart");
    } else {
      setAddedMsg(true);
      setTimeout(() => setAddedMsg(false), 2500);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "100px 20px", fontSize: "18px", color: "#64748b" }}>
        Loading Product Specifications...
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "100px 20px" }}>
        <h2 style={{ fontSize: "22px", color: "#0f172a", marginBottom: "12px" }}>Product nahi mila!</h2>
        <button
          onClick={() => navigate("/")}
          style={{ background: "#2563eb", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }}
        >
          Back to Store
        </button>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div style={{ maxWidth: "1200px", margin: "24px auto", padding: "0 20px" }}>
      <button
        onClick={() => navigate(-1)}
        style={{ background: "none", border: "none", color: "#2563eb", cursor: "pointer", fontWeight: "600", marginBottom: "20px" }}
      >
        ← Back
      </button>

      {addedMsg && (
        <div style={{ background: "#dcfce7", color: "#15803d", padding: "12px 18px", borderRadius: "8px", marginBottom: "20px", fontWeight: "600" }}>
          ✓ Item aapke cart me add ho gaya hai!
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "48px", background: "#ffffff", padding: "32px", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
        <div style={{ background: "#f8fafc", borderRadius: "12px", overflow: "hidden", border: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", maxHeight: "480px" }}>
          <img
            src={product.image}
            alt={product.title}
            style={{ width: "100%", maxHeight: "480px", objectFit: "contain" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <span style={{ fontSize: "12px", background: "#e0f2fe", color: "#0284c7", padding: "4px 10px", borderRadius: "4px", fontWeight: "700", textTransform: "uppercase" }}>
              {product.category}
            </span>

            <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#0f172a", margin: "14px 0 8px" }}>
              {product.title}
            </h1>

            {product.rating && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <span style={{ background: "#f59e0b", color: "#fff", fontSize: "13px", fontWeight: "700", padding: "3px 8px", borderRadius: "4px" }}>
                  ★ {product.rating.rate}
                </span>
                <span style={{ fontSize: "14px", color: "#64748b" }}>
                  ({product.rating.count} Customer Verified Ratings)
                </span>
              </div>
            )}

            <div style={{ display: "flex", alignItems: "baseline", gap: "12px", margin: "18px 0" }}>
              <span style={{ fontSize: "32px", fontWeight: "900", color: "#0f172a" }}>
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <>
                  <span style={{ fontSize: "18px", color: "#94a3b8", textDecoration: "line-through" }}>
                    ₹{product.originalPrice}
                  </span>
                  <span style={{ fontSize: "16px", color: "#ef4444", fontWeight: "700" }}>
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>

            <p style={{ fontSize: "15px", color: "#475569", lineHeight: "1.6", borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9", padding: "16px 0" }}>
              {product.description}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", margin: "20px 0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#334155" }}>
                <span>🛡️</span> <b>1 Year Official Warranty</b>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#334155" }}>
                <span>⚡</span> <b>Express Delivery Available</b>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#334155" }}>
                <span>🔄</span> <b>7 Days Replacement</b>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#334155" }}>
                <span>🔒</span> <b>Secure Checkout</b>
              </div>
            </div>
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
              <span style={{ fontSize: "14px", fontWeight: "600", color: "#0f172a" }}>Quantity:</span>
              <div style={{ display: "flex", alignItems: "center", border: "1.5px solid #cbd5e1", borderRadius: "8px" }}>
                <button
                  onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                  style={{ padding: "6px 14px", border: "none", background: "#f8fafc", cursor: "pointer", fontWeight: "bold" }}
                >
                  -
                </button>
                <span style={{ padding: "6px 16px", fontWeight: "700" }}>{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  style={{ padding: "6px 14px", border: "none", background: "#f8fafc", cursor: "pointer", fontWeight: "bold" }}
                >
                  +
                </button>
              </div>
            </div>

            <div style={{ display: "flex", gap: "14px" }}>
              <button
                onClick={() => handleAddToCart(false)}
                style={{ flex: 1, padding: "14px", background: "#0f172a", color: "#ffffff", border: "none", borderRadius: "8px", fontWeight: "700", cursor: "pointer", fontSize: "15px" }}
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleAddToCart(true)}
                style={{ flex: 1, padding: "14px", background: "#2563eb", color: "#ffffff", border: "none", borderRadius: "8px", fontWeight: "700", cursor: "pointer", fontSize: "15px" }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;