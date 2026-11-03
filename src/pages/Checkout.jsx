import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [success, setSuccess] = useState(false);
  const [placedId, setPlacedId] = useState("");

  // Coupon Engine States
  const [couponInput, setCouponInput] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");

  const [form, setForm] = useState({
    fullName: "Shivam Yadav",
    phone: "9876543210",
    street: "Rajpur Road, Near Clock Tower",
    city: "Dehradun",
    pincode: "248001",
    payMode: "Cash on Delivery",
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("bytecart_items");
      setCartItems(saved ? JSON.parse(saved) : []);
    } catch (e) {
      setCartItems([]);
    }
  }, []);

  const subtotal = cartItems.reduce((acc, i) => acc + Number(i.price || 0) * (Number(i.quantity) || 1), 0);
  const delivery = subtotal > 499 || subtotal === 0 ? 0 : 40;
  const grandTotal = Math.max(0, subtotal + delivery - appliedDiscount);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponInput.trim().toUpperCase();
    if (code === "FESTIVE10") {
      const disc = Math.round(subtotal * 0.1);
      setAppliedDiscount(disc);
      setCouponMsg(`✓ Code FESTIVE10 applied! ₹${disc} discount credited.`);
    } else if (code === "BYTE50") {
      setAppliedDiscount(50);
      setCouponMsg("✓ Code BYTE50 applied! ₹50 instant discount credited.");
    } else {
      setAppliedDiscount(0);
      setCouponMsg("✕ Invalid coupon. Try FESTIVE10 or BYTE50.");
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    const orderId = "AMZ-IN-" + Math.floor(100000 + Math.random() * 900000);
    const newOrder = {
      orderId,
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      items: [...cartItems],
      subtotal,
      discount: appliedDiscount,
      total: grandTotal,
      shipping: form,
      paymentMethod: form.payMode,
    };

    let existing = [];
    try {
      existing = JSON.parse(localStorage.getItem("bytecart_orders") || "[]");
    } catch (err) {}

    localStorage.setItem("bytecart_orders", JSON.stringify([newOrder, ...existing]));
    localStorage.removeItem("bytecart_items");
    window.dispatchEvent(new Event("storage"));

    setPlacedId(orderId);
    setSuccess(true);
  };

  if (success) {
    return (
      <div style={{ maxWidth: "560px", margin: "50px auto", background: "#fff", padding: "34px", borderRadius: "12px", border: "1px solid #e2e8f0", textAlign: "center", fontFamily: "Inter, sans-serif" }}>
        <div style={{ color: "#16a34a", fontSize: "48px", marginBottom: "8px" }}>✓</div>
        <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a", margin: "0 0 6px" }}>Order placed successfully!</h2>
        <p style={{ color: "#64748b", fontSize: "14px", margin: "0 0 20px" }}>Order ID: <strong style={{ color: "#2563eb", fontFamily: "monospace" }}>{placedId}</strong></p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <button onClick={() => navigate("/orders")} style={{ background: "#2563eb", color: "#fff", border: "none", padding: "10px 22px", borderRadius: "8px", fontWeight: "700", cursor: "pointer" }}>
            View in Orders & Download PDF
          </button>
          <button onClick={() => navigate("/")} style={{ background: "#f1f5f9", color: "#334155", border: "none", padding: "10px 22px", borderRadius: "8px", fontWeight: "700", cursor: "pointer" }}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1150px", margin: "24px auto", padding: "0 20px", fontFamily: "Inter, sans-serif" }}>
      <h1 style={{ fontSize: "26px", fontWeight: "800", marginBottom: "20px" }}>Checkout</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1.9fr 1.1fr", gap: "28px", alignItems: "flex-start" }}>
        {/* Shipping details */}
        <form onSubmit={handlePlaceOrder} style={{ background: "#fff", padding: "24px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
          <h3 style={{ margin: "0 0 16px", fontSize: "18px", fontWeight: "800" }}>1. Delivery Address</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
            <input type="text" placeholder="Full name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required style={{ padding: "10px", border: "1px solid #cbd5e1", borderRadius: "6px" }} />
            <input type="text" placeholder="Mobile number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required style={{ padding: "10px", border: "1px solid #cbd5e1", borderRadius: "6px" }} />
            <input type="text" placeholder="Street Address" value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} required style={{ padding: "10px", border: "1px solid #cbd5e1", borderRadius: "6px" }} />
            <div style={{ display: "flex", gap: "10px" }}>
              <input type="text" placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} required style={{ flex: 1, padding: "10px", border: "1px solid #cbd5e1", borderRadius: "6px" }} />
              <input type="text" placeholder="PIN code" value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} required style={{ flex: 1, padding: "10px", border: "1px solid #cbd5e1", borderRadius: "6px" }} />
            </div>
          </div>

          <h3 style={{ margin: "0 0 12px", fontSize: "18px", fontWeight: "800" }}>2. Payment Method</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "600" }}>
              <input type="radio" checked readOnly /> Cash on Delivery (COD) / Pay on Delivery
            </label>
          </div>

          <button type="submit" disabled={cartItems.length === 0} style={{ width: "100%", padding: "14px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "800", cursor: "pointer", fontSize: "15px" }}>
            Confirm & Place Order (₹{grandTotal})
          </button>
        </form>

        {/* Summary + Coupon Box */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Coupon Box */}
          <div style={{ background: "#fff", padding: "18px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <div style={{ fontSize: "14px", fontWeight: "700", marginBottom: "8px" }}>🎟️ Have a Promo Code?</div>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="text"
                placeholder="Try FESTIVE10"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                style={{ flex: 1, padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px", textTransform: "uppercase", fontWeight: "700" }}
              />
              <button
                type="button"
                onClick={handleApplyCoupon}
                style={{ padding: "8px 16px", background: "#0f172a", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "700", cursor: "pointer" }}
              >
                Apply
              </button>
            </div>
            {couponMsg && (
              <div style={{ fontSize: "12px", fontWeight: "700", marginTop: "8px", color: appliedDiscount > 0 ? "#16a34a" : "#dc2626" }}>
                {couponMsg}
              </div>
            )}
          </div>

          {/* Pricing Details */}
          <div style={{ background: "#fff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <h3 style={{ margin: "0 0 14px", fontSize: "16px", fontWeight: "800" }}>Price Summary</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "14px" }}>
              {cartItems.map((it) => (
                <div key={it._id} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{it.title} × {it.quantity || 1}</span>
                  <span style={{ fontWeight: "600" }}>₹{it.price * (it.quantity || 1)}</span>
                </div>
              ))}
            </div>
            <hr style={{ border: "none", borderTop: "1px solid #f1f5f9" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", margin: "6px 0" }}><span>Subtotal:</span><span>₹{subtotal}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", margin: "6px 0" }}><span>Delivery:</span><span style={{ color: "#16a34a" }}>{delivery === 0 ? "FREE" : `₹${delivery}`}</span></div>
            {appliedDiscount > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", margin: "6px 0", color: "#16a34a", fontWeight: "700" }}>
                <span>Coupon Discount:</span>
                <span>-₹{appliedDiscount}</span>
              </div>
            )}
            <hr style={{ border: "none", borderTop: "1px dashed #cbd5e1" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "18px", fontWeight: "900", color: "#0f172a", marginTop: "10px" }}>
              <span>Total Payable:</span>
              <span>₹{grandTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;