import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStyle, setSelectedStyle] = useState("Peak");
  const [activeTab, setActiveTab] = useState("Details");
  const [qty, setQty] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Reviews Engine State
  const [reviews, setReviews] = useState([
    {
      name: "Amit Sharma",
      rating: 5,
      date: "28 October 2026",
      comment: "Outstanding build quality and fast battery backup. Totally worth the price!",
    },
    {
      name: "Rahul Verma",
      rating: 4,
      date: "15 October 2026",
      comment: "Packaging and express delivery by ByteCart was top-notch.",
    },
  ]);
  const [newReview, setNewReview] = useState({ name: "", rating: 5, comment: "" });

  // 1. Fetch Product Data
  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("ID route missed");
        return res.json();
      })
      .then((data) => {
        if (data && (data._id || data.title)) {
          setProduct(data);
          setLoading(false);
        } else {
          throw new Error("Invalid");
        }
      })
      .catch(() => {
        // Fallback: match from list
        fetch("http://localhost:5000/api/products")
          .then((r) => r.json())
          .then((list) => {
            const arr = Array.isArray(list) ? list : [];
            const found = arr.find((p) => String(p._id) === String(id));
            if (found) setProduct(found);
            setLoading(false);
          })
          .catch(() => setLoading(false));
      });

    try {
      const savedWish = JSON.parse(localStorage.getItem("bytecart_wishlist") || "[]");
      setIsWishlisted(savedWish.some((item) => String(item._id) === String(id)));
    } catch (e) {}
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px", color: "#565959", fontFamily: "Arial, sans-serif" }}>
        Loading verified product specifications from database...
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px", fontFamily: "Arial, sans-serif" }}>
        <h2>Product Details Not Found</h2>
        <button
          onClick={() => navigate("/")}
          style={{ background: "#ffd814", border: "1px solid #fcd200", padding: "8px 20px", borderRadius: "20px", fontWeight: "700", cursor: "pointer" }}
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  // Dynamic Style Multipliers
  const styleMultiplier = selectedStyle === "Peak" ? 1 : selectedStyle === "One" ? 0.8 : 1.4;
  const currentPrice = Math.round(Number(product.price) * styleMultiplier);
  const mrp = Math.round(currentPrice * 1.35);
  const discountPercent = Math.round(((mrp - currentPrice) / mrp) * 100);

  const handleAddToCart = () => {
    let cart = [];
    try {
      cart = JSON.parse(localStorage.getItem("bytecart_items") || "[]");
    } catch (e) {}
    const cartItem = {
      ...product,
      title: `${product.title} (${selectedStyle})`,
      price: currentPrice,
    };
    const idx = cart.findIndex((p) => String(p._id) === String(product._id) && p.style === selectedStyle);
    if (idx !== -1) {
      cart[idx].quantity = (Number(cart[idx].quantity) || 1) + qty;
    } else {
      cart.push({ ...cartItem, quantity: qty, style: selectedStyle });
    }
    localStorage.setItem("bytecart_items", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
    alert(`${qty} ${product.title} (${selectedStyle}) cart me add ho gaya!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/checkout");
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;
    const added = {
      name: newReview.name,
      rating: Number(newReview.rating),
      date: "Today",
      comment: newReview.comment,
    };
    setReviews([added, ...reviews]);
    setNewReview({ name: "", rating: 5, comment: "" });
    alert("Review successfully publish ho gaya!");
  };

  const toggleWishlist = () => {
    let savedWish = [];
    try {
      savedWish = JSON.parse(localStorage.getItem("bytecart_wishlist") || "[]");
    } catch (e) {}
    let updated = [];
    if (isWishlisted) {
      updated = savedWish.filter((item) => String(item._id) !== String(product._id));
      setIsWishlisted(false);
    } else {
      updated = [...savedWish, product];
      setIsWishlisted(true);
    }
    localStorage.setItem("bytecart_wishlist", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh", fontFamily: "Arial, sans-serif", color: "#0f1111" }}>
      {/* Sticky Quick Nav Bar */}
      <div style={{ background: "#ffffff", borderBottom: "1px solid #e7e7e7", padding: "10px 20px", display: "flex", gap: "24px", fontSize: "14px", fontWeight: "700", position: "sticky", top: "58px", zIndex: 10 }}>
        {["Details", "Explore", "Reviews"].map((tab) => (
          <span
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              cursor: "pointer",
              color: activeTab === tab ? "#c45500" : "#565959",
              borderBottom: activeTab === tab ? "3px solid #c45500" : "none",
              paddingBottom: "6px",
            }}
          >
            {tab}
          </span>
        ))}
      </div>

      <div style={{ maxWidth: "1280px", margin: "18px auto", padding: "0 18px", display: "grid", gridTemplateColumns: "1.1fr 1.3fr 0.9fr", gap: "30px", alignItems: "flex-start" }}>
        
        {/* ================= COL 1: IMAGE & BADGES ================= */}
        <div>
          {/* Brand & Store */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ color: "#007185", fontWeight: "700", fontSize: "13px", cursor: "pointer" }}>
              Visit the {product.category || "Official"} Store
            </span>
            <div style={{ fontSize: "13px", color: "#007185" }}>
              4.1 <span style={{ color: "#de7921" }}>★★★★☆</span> ({product.rating?.count || 2745})
            </div>
          </div>

          {/* Product Image */}
          <div style={{ border: "1px solid #e7e7e7", borderRadius: "10px", padding: "20px", textAlign: "center", position: "relative", height: "400px", display: "flex", alignItems: "center", justifyContent: "center", background: "#fbfbfb" }}>
            <span style={{ position: "absolute", top: "12px", left: "12px", background: "#cc0c39", color: "#fff", borderRadius: "50%", width: "42px", height: "42px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "900", textAlign: "center", lineHeight: "1.1" }}>
              {discountPercent}%<br/>off
            </span>
            <img
              src={product.image}
              alt={product.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80";
              }}
              style={{ maxHeight: "350px", maxWidth: "90%", objectFit: "contain" }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px" }}>
            <span style={{ fontSize: "12px", color: "#565959" }}>9K+ bought in past month</span>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={toggleWishlist} style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer" }}>
                {isWishlisted ? "❤️" : "🤍"}
              </button>
              <button onClick={() => alert("Link copied to clipboard!")} style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer" }}>
                🔗
              </button>
            </div>
          </div>
        </div>

        {/* ================= COL 2: MAIN TITLE, STYLES & HIGHLIGHTS ================= */}
        <div>
          {/* Badge */}
          <span style={{ background: "#232f3e", color: "#ffffff", fontSize: "11px", fontWeight: "800", padding: "3px 8px", borderRadius: "2px", display: "inline-block", marginBottom: "8px" }}>
            ByteCart's Choice
          </span>

          <h1 style={{ fontSize: "20px", fontWeight: "600", lineHeight: "1.4", margin: "0 0 10px", color: "#0f1111" }}>
            {product.title} - Next-Gen Smart Performance, High Precision Sensor & Rapid Sync
          </h1>

          <div style={{ fontSize: "13px", color: "#565959", marginBottom: "14px" }}>
            Activity Tracker, Heart Health Monitor, Water-Resistant IP68, 14+ Days Battery Backup
          </div>

          <hr style={{ border: "none", borderTop: "1px solid #e7e7e7", margin: "12px 0" }} />

          {/* Style Selector Boxes (Peak, One, Life) */}
          <div style={{ marginBottom: "16px" }}>
            <div style={{ fontSize: "13px", color: "#565959", marginBottom: "8px" }}>
              Style Name: <strong>{selectedStyle}</strong>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              {[
                { name: "Peak", price: Math.round(Number(product.price)), mrp: Math.round(Number(product.price) * 1.35) },
                { name: "One", price: Math.round(Number(product.price) * 0.8), mrp: Math.round(Number(product.price) * 1.1) },
                { name: "Life", price: Math.round(Number(product.price) * 1.4), mrp: Math.round(Number(product.price) * 1.8) },
              ].map((st) => (
                <div
                  key={st.name}
                  onClick={() => setSelectedStyle(st.name)}
                  style={{
                    border: selectedStyle === st.name ? "2px solid #007185" : "1px solid #d5d9d9",
                    borderRadius: "8px",
                    padding: "8px 14px",
                    cursor: "pointer",
                    background: selectedStyle === st.name ? "#f0f8f9" : "#fff",
                    minWidth: "100px",
                  }}
                >
                  <strong style={{ fontSize: "14px", color: "#0f1111" }}>{st.name}</strong>
                  <div style={{ fontSize: "15px", fontWeight: "800", margin: "4px 0 2px" }}>₹{st.price}</div>
                  <div style={{ fontSize: "11px", color: "#565959", textDecoration: "line-through" }}>₹{st.mrp}</div>
                  <div style={{ fontSize: "11px", color: "#007600", fontWeight: "700" }}>In stock</div>
                </div>
              ))}
            </div>
          </div>

          {/* Deal & Price Box */}
          <div style={{ marginBottom: "14px" }}>
            <span style={{ background: "#cc0c39", color: "#fff", fontSize: "11px", fontWeight: "800", padding: "3px 8px", borderRadius: "3px" }}>
              Great Indian Festival
            </span>
            <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginTop: "8px" }}>
              <span style={{ fontSize: "26px", color: "#cc0c39", fontWeight: "400" }}>-{discountPercent}%</span>
              <span style={{ fontSize: "30px", fontWeight: "800" }}>₹{currentPrice}</span>
            </div>
            <div style={{ fontSize: "12px", color: "#565959" }}>
              M.R.P.: <span style={{ textDecoration: "line-through" }}>₹{mrp}</span>
            </div>
            <div style={{ fontSize: "13px", marginTop: "4px" }}>
              EMI from <strong>₹{Math.round(currentPrice / 6)}/month</strong>. No Cost EMI available. Inclusive of all taxes.
            </div>
          </div>

          {/* No Cost EMI Strip */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
            <div style={{ border: "1px solid #d5d9d9", borderRadius: "8px", padding: "10px 14px", flex: 1, fontSize: "12px" }}>
              <strong style={{ color: "#0f1111" }}>No Cost EMI ₹{Math.round(currentPrice / 6)} x 6m</strong>
              <div style={{ color: "#565959", marginTop: "2px" }}>💳 All Major Credit Cards</div>
            </div>
            <div style={{ border: "1px solid #d5d9d9", borderRadius: "8px", padding: "10px 14px", flex: 1, fontSize: "12px" }}>
              <strong style={{ color: "#007600" }}>Bank Offer: ₹250 Instant Off</strong>
              <div style={{ color: "#565959", marginTop: "2px" }}>On UPI & Debit Card checkout</div>
            </div>
          </div>

          {/* Top Highlights Table */}
          <h3 style={{ fontSize: "16px", fontWeight: "800", margin: "16px 0 10px" }}>Top highlights</h3>
          <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "8px", fontSize: "13px", lineHeight: "1.6" }}>
            <strong>Brand:</strong> <span>ByteCart PRO Verified</span>
            <strong>Category:</strong> <span>{product.category}</span>
            <strong>Material:</strong> <span>Aerospace Aluminum & High-Grade Polymer</span>
            <strong>Colour:</strong> <span>Matte Stealth Black</span>
            <strong>Battery Life:</strong> <span>Up to 14 Days Continuous Active Use</span>
            <strong>Compatible:</strong> <span>Android, iOS, Tablets & Laptops</span>
          </div>

          <p style={{ fontSize: "13px", color: "#333", marginTop: "12px", lineHeight: "1.5" }}>
            {product.description || "Engineered for optimal comfort, precise response tracking and ultra-low latency connection. Includes manufacturer warranty and certified pan-India doorstep servicing."}
          </p>
        </div>

        {/* ================= COL 3: BUY BOX & CHECKOUT ================= */}
        <div style={{ border: "1px solid #d5d9d9", borderRadius: "10px", padding: "18px", background: "#ffffff" }}>
          <div style={{ fontSize: "24px", fontWeight: "800", color: "#0f1111", marginBottom: "8px" }}>
            ₹{currentPrice * qty}
          </div>

          <div style={{ fontSize: "13px", color: "#007185", fontWeight: "700", marginBottom: "6px" }}>
            FREE delivery <strong>Tomorrow Evening</strong>.
          </div>
          <div style={{ fontSize: "13px", color: "#007600", fontWeight: "700", marginBottom: "12px" }}>
            Order within 2 hrs 37 mins.
          </div>

          <div style={{ fontSize: "12px", color: "#565959", marginBottom: "14px" }}>
            📍 Delivering to <strong>Dehradun 248007 - Update location</strong>
          </div>

          <div style={{ fontSize: "18px", color: "#007600", fontWeight: "800", marginBottom: "14px" }}>
            In stock
          </div>

          {/* Quantity Selector */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px", fontSize: "13px" }}>
            <span>Quantity:</span>
            <select
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              style={{ padding: "4px 10px", borderRadius: "6px", border: "1px solid #d5d9d9", background: "#f0f2f2", cursor: "pointer" }}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          {/* Amazon Action Buttons */}
          <button
            onClick={handleAddToCart}
            style={{
              background: "#ffd814",
              border: "1px solid #fcd200",
              borderRadius: "20px",
              padding: "10px 0",
              width: "100%",
              fontSize: "13px",
              fontWeight: "700",
              color: "#0f1111",
              cursor: "pointer",
              marginBottom: "8px",
            }}
          >
            Add to cart
          </button>

          <button
            onClick={handleBuyNow}
            style={{
              background: "#ffa41c",
              border: "1px solid #ff8f00",
              borderRadius: "20px",
              padding: "10px 0",
              width: "100%",
              fontSize: "13px",
              fontWeight: "700",
              color: "#0f1111",
              cursor: "pointer",
              marginBottom: "16px",
            }}
          >
            Buy Now
          </button>

          {/* Trust Matrix */}
          <div style={{ fontSize: "12px", color: "#565959", borderTop: "1px solid #e7e7e7", paddingTop: "12px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            <div>🚚 Free Delivery</div>
            <div>💵 Pay on Delivery</div>
            <div>🔄 10 Days Replacement</div>
            <div>🛡️ ByteCart Delivered</div>
          </div>
        </div>
      </div>

      {/* ================= CUSTOMER REVIEWS & RATINGS SECTION ================= */}
      <div style={{ maxWidth: "1280px", margin: "40px auto 20px", padding: "0 18px", borderTop: "1px solid #e7e7e7", paddingTop: "26px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "800", marginBottom: "16px" }}>Customer reviews</h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "36px" }}>
          {/* Add Review Box */}
          <div style={{ background: "#f8fafc", padding: "20px", borderRadius: "10px", border: "1px solid #e2e8f0", height: "fit-content" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "700", margin: "0 0 12px" }}>Review this product</h3>
            <p style={{ fontSize: "13px", color: "#565959", margin: "0 0 14px" }}>Share your thoughts with other customers</p>
            <form onSubmit={handleAddReview} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <input
                type="text"
                placeholder="Your Name"
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                required
                style={{ padding: "8px 12px", border: "1px solid #d5d9d9", borderRadius: "6px", fontSize: "13px" }}
              />
              <select
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                style={{ padding: "8px 12px", border: "1px solid #d5d9d9", borderRadius: "6px", fontSize: "13px" }}
              >
                <option value={5}>★★★★★ (5 Star - Excellent)</option>
                <option value={4}>★★★★☆ (4 Star - Good)</option>
                <option value={3}>★★★☆☆ (3 Star - Average)</option>
                <option value={2}>★★☆☆☆ (2 Star - Poor)</option>
                <option value={1}>★☆☆☆☆ (1 Star - Terrible)</option>
              </select>
              <textarea
                placeholder="Write your review comments..."
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                required
                style={{ padding: "8px 12px", border: "1px solid #d5d9d9", borderRadius: "6px", fontSize: "13px", height: "70px" }}
              />
              <button
                type="submit"
                style={{ background: "#ffd814", border: "1px solid #fcd200", padding: "8px 16px", borderRadius: "20px", fontWeight: "700", cursor: "pointer", fontSize: "13px" }}
              >
                Submit Review
              </button>
            </form>
          </div>

          {/* Reviews List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {reviews.map((rev, idx) => (
              <div key={idx} style={{ borderBottom: "1px solid #e7e7e7", paddingBottom: "14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#d5d9d9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px" }}>
                    👤
                  </div>
                  <strong style={{ fontSize: "13px" }}>{rev.name}</strong>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                  <span style={{ color: "#de7921", fontSize: "13px" }}>
                    {"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}
                  </span>
                  <span style={{ fontSize: "12px", color: "#565959" }}>Reviewed on {rev.date}</span>
                  <span style={{ color: "#c45500", fontSize: "11px", fontWeight: "700" }}>Verified Purchase</span>
                </div>
                <p style={{ fontSize: "13px", color: "#0f1111", margin: 0, lineHeight: "1.5" }}>
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;