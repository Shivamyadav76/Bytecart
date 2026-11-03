import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCat, setSelectedCat] = useState("All");
  const [priceRange, setPriceRange] = useState(5000);
  const [loading, setLoading] = useState(true);

  // 1. Fetch initial products from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setProducts(list);
        setFilteredProducts(list);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch products error:", err);
        setLoading(false);
      });
  }, []);

  // 2. Synchronize URL query params (?cat=... & ?search=...)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const catFromUrl = params.get("cat");
    if (catFromUrl) {
      setSelectedCat(catFromUrl);
    }
  }, [location.search]);

  // 3. Filter products on Search, Category, or Price change
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("search") || "";
    let res = products;

    if (q) {
      res = res.filter((p) => p.title?.toLowerCase().includes(q.toLowerCase()));
    }

    if (selectedCat !== "All") {
      res = res.filter(
        (p) => p.category?.toLowerCase() === selectedCat.toLowerCase()
      );
    }

    res = res.filter((p) => Number(p.price) <= priceRange);
    setFilteredProducts(res);
  }, [selectedCat, priceRange, location.search, products]);

  const handleCategoryClick = (c) => {
    setSelectedCat(c);
    navigate(c === "All" ? "/" : `/?cat=${encodeURIComponent(c)}`);
  };

  const handleAddToCart = (e, item) => {
    e.stopPropagation();
    let cart = [];
    try {
      cart = JSON.parse(localStorage.getItem("bytecart_items") || "[]");
    } catch (err) {}
    const idx = cart.findIndex((p) => String(p._id) === String(item._id));
    if (idx !== -1) {
      cart[idx].quantity = (Number(cart[idx].quantity) || 1) + 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
    localStorage.setItem("bytecart_items", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
    alert(`${item.title} cart me add ho gaya!`);
  };

  const handleToggleWishlist = (e, item) => {
    e.stopPropagation();
    let wish = [];
    try {
      wish = JSON.parse(localStorage.getItem("bytecart_wishlist") || "[]");
    } catch (err) {}
    const exists = wish.some((w) => String(w._id) === String(item._id));
    let updated = exists
      ? wish.filter((w) => String(w._id) !== String(item._id))
      : [...wish, item];
    localStorage.setItem("bytecart_wishlist", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
    alert(exists ? "Wishlist se remove ho gaya" : "Wishlist me save ho gaya ❤️");
  };

  const categories = ["All", "Electronics", "Wearables", "Footwear", "Fashion", "Lifestyle"];

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", fontFamily: "Inter, sans-serif" }}>
      {/* Signature Hero Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #091e42 0%, #0f2b5c 50%, #1e3a8a 100%)",
          color: "#ffffff",
          padding: "40px 24px",
          borderRadius: "0 0 20px 20px",
          boxShadow: "0 10px 25px -5px rgba(15, 23, 42, 0.25)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <span
              style={{
                background: "rgba(56, 189, 248, 0.15)",
                color: "#38bdf8",
                border: "1px solid rgba(56, 189, 248, 0.3)",
                fontSize: "11px",
                fontWeight: "800",
                padding: "4px 12px",
                borderRadius: "20px",
                letterSpacing: "0.5px",
              }}
            >
              PREMIUM TECH & LIFESTYLE DEALS
            </span>
            <h1 style={{ fontSize: "38px", fontWeight: "900", margin: "12px 0 6px", letterSpacing: "-0.5px" }}>
              Mega Catalog Sale
            </h1>
            <p style={{ fontSize: "15px", color: "#94a3b8", margin: 0, maxWidth: "600px" }}>
              Explore curated products across all categories with 100% verified authentic warranty.
            </p>
          </div>
          <button
            onClick={() => navigate("/admin")}
            style={{
              background: "rgba(255,255,255,0.1)",
              color: "#38bdf8",
              border: "1px solid #38bdf8",
              padding: "8px 16px",
              borderRadius: "8px",
              fontWeight: "700",
              cursor: "pointer",
              fontSize: "12px",
            }}
          >
            ⚡ Open Admin Panel
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div style={{ maxWidth: "1280px", margin: "24px auto", padding: "0 20px" }}>
        {/* Category Chips & Price Slider */}
        <div
          style={{
            background: "#ffffff",
            padding: "16px 20px",
            borderRadius: "14px",
            border: "1px solid #e2e8f0",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            marginBottom: "20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          }}
        >
          {/* Category Chips */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "13px", fontWeight: "700", color: "#64748b", marginRight: "6px" }}>
              Category:
            </span>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => handleCategoryClick(c)}
                style={{
                  background: selectedCat === c ? "#2563eb" : "#f1f5f9",
                  color: selectedCat === c ? "#ffffff" : "#475569",
                  border: "none",
                  padding: "6px 16px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Price Range Slider */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "13px", fontWeight: "700", color: "#64748b" }}>
              Max Price: <strong style={{ color: "#0f172a" }}>₹{priceRange}</strong>
            </span>
            <input
              type="range"
              min="200"
              max="5000"
              step="100"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              style={{ cursor: "pointer", accentColor: "#2563eb", width: "120px" }}
            />
          </div>
        </div>

        {/* 3 High-Converting Festive Sale Banners */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "16px",
            marginBottom: "30px",
          }}
        >
          {/* Banner 1: Under ₹499 */}
          <div
            onClick={() => setPriceRange(499)}
            style={{
              background: "linear-gradient(135deg, #b91c1c, #991b1b)",
              color: "#ffffff",
              padding: "16px 20px",
              borderRadius: "14px",
              boxShadow: "0 4px 14px rgba(185, 28, 28, 0.2)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <div>
              <span style={{ background: "#fef08a", color: "#854d0e", fontSize: "11px", fontWeight: "900", padding: "2px 8px", borderRadius: "4px" }}>
                MEGA SAVINGS
              </span>
              <h3 style={{ fontSize: "20px", fontWeight: "900", margin: "8px 0 2px" }}>Under ₹499 Store</h3>
              <p style={{ margin: 0, fontSize: "12px", color: "#fecaca" }}>Lowest price drop on accessories</p>
            </div>
            <div style={{ fontSize: "32px" }}>🏷️</div>
          </div>

          {/* Banner 2: Electronics */}
          <div
            onClick={() => handleCategoryClick("Electronics")}
            style={{
              background: "linear-gradient(135deg, #1e40af, #1d4ed8)",
              color: "#ffffff",
              padding: "16px 20px",
              borderRadius: "14px",
              boxShadow: "0 4px 14px rgba(30, 64, 175, 0.2)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <div>
              <span style={{ background: "#bfdbfe", color: "#1e3a8a", fontSize: "11px", fontWeight: "900", padding: "2px 8px", borderRadius: "4px" }}>
                UP TO 60% OFF
              </span>
              <h3 style={{ fontSize: "20px", fontWeight: "900", margin: "8px 0 2px" }}>Electronics Fest</h3>
              <p style={{ margin: 0, fontSize: "12px", color: "#dbeafe" }}>Top headsets, chargers & mice deals</p>
            </div>
            <div style={{ fontSize: "32px" }}>⚡</div>
          </div>

          {/* Banner 3: Bank Offers */}
          <div
            style={{
              background: "linear-gradient(135deg, #065f46, #047857)",
              color: "#ffffff",
              padding: "16px 20px",
              borderRadius: "14px",
              boxShadow: "0 4px 14px rgba(6, 95, 70, 0.2)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <span style={{ background: "#a7f3d0", color: "#064e3b", fontSize: "11px", fontWeight: "900", padding: "2px 8px", borderRadius: "4px" }}>
                BANK OFFER
              </span>
              <h3 style={{ fontSize: "20px", fontWeight: "900", margin: "8px 0 2px" }}>10% Instant Off</h3>
              <p style={{ margin: 0, fontSize: "12px", color: "#d1fae5" }}>On all Credit Cards & UPI checkout</p>
            </div>
            <div style={{ fontSize: "32px" }}>💳</div>
          </div>
        </div>

        {/* Product Grid */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "16px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a" }}>
              {selectedCat === "All" ? "Featured Products" : `${selectedCat} Products`} ({filteredProducts.length})
            </h2>
            <span style={{ fontSize: "13px", color: "#64748b" }}>
              Showing real-time catalog from MongoDB Atlas
            </span>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#64748b" }}>
              Loading ByteCart catalog...
            </div>
          ) : filteredProducts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "50px", background: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <p style={{ color: "#64748b", fontSize: "15px", marginBottom: "12px" }}>Is category me koi product match nahi hua.</p>
              <button
                onClick={() => handleCategoryClick("All")}
                style={{ background: "#2563eb", color: "#fff", border: "none", padding: "8px 18px", borderRadius: "6px", fontWeight: "700", cursor: "pointer" }}
              >
                Show All Products
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "24px",
              }}
            >
              {filteredProducts.map((p) => (
                <div
                  key={p._id}
                  onClick={() => navigate(`/product/${p._id}`)}
                  style={{
                    background: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "16px",
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
                    cursor: "pointer",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.02)";
                  }}
                >
                  {/* Heart Wishlist Button */}
                  <button
                    onClick={(e) => handleToggleWishlist(e, p)}
                    style={{
                      position: "absolute",
                      top: "14px",
                      right: "14px",
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      borderRadius: "50%",
                      width: "32px",
                      height: "32px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                    }}
                    title="Save to Wishlist"
                  >
                    🤍
                  </button>

                  <div>
                    {/* Category Tag */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                      <span
                        style={{
                          background: "#eff6ff",
                          color: "#2563eb",
                          fontSize: "11px",
                          fontWeight: "800",
                          padding: "3px 8px",
                          borderRadius: "6px",
                          textTransform: "uppercase",
                        }}
                      >
                        {p.category}
                      </span>
                      <span style={{ fontSize: "12px", color: "#16a34a", fontWeight: "700" }}>
                        In Stock
                      </span>
                    </div>

                    {/* Image Box */}
                    <div
                      style={{
                        height: "180px",
                        background: "#f8fafc",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "10px",
                        marginBottom: "14px",
                      }}
                    >
                      <img
                        src={p.image}
                        alt={p.title}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80";
                        }}
                        style={{ maxHeight: "160px", maxWidth: "100%", objectFit: "contain" }}
                      />
                    </div>

                    {/* Title */}
                    <h3
                      style={{
                        fontSize: "15px",
                        fontWeight: "700",
                        color: "#0f172a",
                        margin: "0 0 6px",
                        lineHeight: "1.4",
                        height: "42px",
                        overflow: "hidden",
                      }}
                    >
                      {p.title}
                    </h3>

                    {/* Rating */}
                    <div style={{ fontSize: "13px", color: "#f59e0b", marginBottom: "8px" }}>
                      ★ ★ ★ ★ ☆ <span style={{ color: "#64748b", fontSize: "12px" }}>({p.rating?.count || 120})</span>
                    </div>

                    {/* Price */}
                    <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "14px" }}>
                      <span style={{ fontSize: "22px", fontWeight: "900", color: "#0f172a" }}>
                        ₹{p.price}
                      </span>
                      <span style={{ fontSize: "13px", color: "#94a3b8", textDecoration: "line-through" }}>
                        ₹{Math.round(p.price * 1.35)}
                      </span>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={(e) => handleAddToCart(e, p)}
                    style={{
                      width: "100%",
                      padding: "10px",
                      background: "#2563eb",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "10px",
                      fontWeight: "700",
                      fontSize: "14px",
                      cursor: "pointer",
                      transition: "background 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#1d4ed8")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#2563eb")}
                  >
                    Add to Cart 🛒
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;