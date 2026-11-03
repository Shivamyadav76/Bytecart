import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [locationName, setLocationName] = useState("Dehradun 248007");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const updateState = () => {
    try {
      const items = JSON.parse(localStorage.getItem("bytecart_items") || "[]");
      const total = items.reduce((acc, it) => acc + (Number(it.quantity) || 1), 0);
      setCartCount(total);
      const savedUser = localStorage.getItem("bytecart_user");
      setUser(savedUser ? JSON.parse(savedUser) : null);
    } catch (e) {
      setCartCount(0);
    }
  };

  useEffect(() => {
    updateState();
    window.addEventListener("storage", updateState);
    return () => window.removeEventListener("storage", updateState);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${encodeURIComponent(search)}`);
  };

  const handleCategoryNav = (cat) => {
    setIsMenuOpen(false);
    navigate(cat === "All" ? "/" : `/?cat=${encodeURIComponent(cat)}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("bytecart_token");
    localStorage.removeItem("bytecart_user");
    setUser(null);
    setIsMenuOpen(false);
    navigate("/");
  };

  const handleLocationChange = () => {
    const newLoc = prompt("Apna Delivery City ya Pincode dalein:", locationName);
    if (newLoc && newLoc.trim()) {
      setLocationName(newLoc.trim());
    }
  };

  return (
    <>
      <header style={{ fontFamily: "Inter, system-ui, sans-serif", position: "sticky", top: 0, zIndex: 100 }}>
        {/* Main Navbar */}
        <div
          style={{
            background: "#0b1329",
            padding: "10px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            borderBottom: "1px solid #1e293b",
          }}
        >
          {/* Hamburger Menu & Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <button
              onClick={() => setIsMenuOpen(true)}
              style={{
                background: "transparent",
                border: "none",
                color: "#ffffff",
                fontSize: "24px",
                cursor: "pointer",
                padding: "2px 6px",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
              }}
              title="Open Side Menu"
            >
              ☰
            </button>

            {/* Only bytecart Brand Logo */}
            <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
              <span style={{ fontSize: "25px", fontWeight: "900", color: "#ffffff", letterSpacing: "0.2px" }}>
                bytecart
              </span>
            </Link>
          </div>

          {/* Location Delivery */}
          <div
            onClick={handleLocationChange}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
              padding: "4px 8px",
              borderRadius: "6px",
              background: "#132142",
              border: "1px solid #1e293b",
            }}
            title="Click to update delivery location"
          >
            <span style={{ fontSize: "18px" }}>📍</span>
            <div style={{ lineHeight: "1.2" }}>
              <div style={{ color: "#94a3b8", fontSize: "11px" }}>Deliver to {user ? user.name : "Shivam"}</div>
              <strong style={{ color: "#38bdf8", fontSize: "12px" }}>{locationName} ▾</strong>
            </div>
          </div>

          {/* Global Search Bar */}
          <form
            onSubmit={handleSearch}
            style={{
              flex: 1,
              maxWidth: "480px",
              display: "flex",
              alignItems: "center",
              background: "#1e293b",
              borderRadius: "8px",
              border: "1px solid #334155",
              overflow: "hidden",
              padding: "2px 4px",
            }}
          >
            <input
              type="text"
              placeholder="Search headphones, shoes, laptops, wearables..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                color: "#ffffff",
                padding: "8px 12px",
                fontSize: "13px",
                outline: "none",
              }}
            />
            <button
              type="submit"
              style={{
                background: "#2563eb",
                border: "none",
                color: "#ffffff",
                padding: "7px 14px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "700",
                fontSize: "13px",
              }}
            >
              Search
            </button>
          </form>

          {/* Actions & Links */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link to="/" style={{ color: "#cbd5e1", textDecoration: "none", fontWeight: "600", fontSize: "13px" }}>
              Explore
            </Link>

            <Link
              to="/orders"
              style={{
                color: "#cbd5e1",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "13px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              📦 Orders
            </Link>

            <Link
              to="/wishlist"
              style={{
                color: "#cbd5e1",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "13px",
              }}
            >
              ❤️ Wishlist
            </Link>

            {/* Account Info */}
            {user ? (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ textAlign: "right", lineHeight: "1.2" }}>
                  <div style={{ fontSize: "11px", color: "#94a3b8" }}>Hello,</div>
                  <strong style={{ fontSize: "13px", color: "#38bdf8" }}>{user.name}</strong>
                </div>
                <button
                  onClick={handleLogout}
                  style={{
                    background: "#ef4444",
                    color: "#ffffff",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  lineHeight: "1.2",
                }}
              >
                <span style={{ fontSize: "11px", color: "#94a3b8" }}>Hello, Sign in</span>
                <strong style={{ fontSize: "13px", color: "#ffffff" }}>Account & Lists ▾</strong>
              </Link>
            )}

            {/* Cart Button */}
            <Link
              to="/cart"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: "#1e293b",
                border: "1px solid #334155",
                padding: "6px 12px",
                borderRadius: "8px",
                color: "#ffffff",
                textDecoration: "none",
                fontWeight: "700",
                fontSize: "13px",
              }}
            >
              🛒 Cart
              <span
                style={{
                  background: "#2563eb",
                  color: "#ffffff",
                  padding: "2px 7px",
                  borderRadius: "10px",
                  fontSize: "11px",
                  fontWeight: "800",
                }}
              >
                {cartCount}
              </span>
            </Link>
          </div>
        </div>

        {/* Secondary Category Bar */}
        <div
          style={{
            background: "#132142",
            padding: "8px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#ffffff",
            fontSize: "13px",
            fontWeight: "600",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <span
              onClick={() => setIsMenuOpen(true)}
              style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}
            >
              ☰ All
            </span>
            <span
              onClick={() => handleCategoryNav("Electronics")}
              style={{ cursor: "pointer", color: "#cbd5e1" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#cbd5e1")}
            >
              Electronics
            </span>
            <span
              onClick={() => handleCategoryNav("Wearables")}
              style={{ cursor: "pointer", color: "#cbd5e1" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#cbd5e1")}
            >
              Wearables
            </span>
            <span
              onClick={() => handleCategoryNav("Footwear")}
              style={{ cursor: "pointer", color: "#cbd5e1" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#cbd5e1")}
            >
              Footwear
            </span>
            <span
              onClick={() => handleCategoryNav("Fashion")}
              style={{ cursor: "pointer", color: "#cbd5e1" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#cbd5e1")}
            >
              Fashion
            </span>
            <span
              onClick={() => handleCategoryNav("Lifestyle")}
              style={{ cursor: "pointer", color: "#cbd5e1" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#cbd5e1")}
            >
              Lifestyle
            </span>
          </div>

          <div style={{ color: "#38bdf8", fontWeight: "700", fontSize: "12px" }}>
            ✨ ByteCart Festive Deals Live Now
          </div>
        </div>
      </header>

      {/* Complete Amazon-Style Side Drawer */}
      {isMenuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex" }}>
          <div
            onClick={() => setIsMenuOpen(false)}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(2px)",
            }}
          />

          <div
            style={{
              position: "relative",
              width: "350px",
              maxWidth: "85vw",
              height: "100%",
              background: "#ffffff",
              boxShadow: "4px 0 24px rgba(0,0,0,0.3)",
              display: "flex",
              flexDirection: "column",
              zIndex: 1001,
            }}
          >
            <div
              style={{
                background: "#0b1329",
                color: "#ffffff",
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "22px" }}>👤</span>
                <div>
                  <div style={{ fontSize: "12px", color: "#94a3b8" }}>Hello,</div>
                  <strong style={{ fontSize: "16px", color: "#ffffff" }}>
                    {user ? user.name : "Sign in"}
                  </strong>
                </div>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#ffffff",
                  fontSize: "20px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "14px 0", color: "#0f172a" }}>
              <div style={{ padding: "0 20px 10px" }}>
                <h4 style={{ fontSize: "15px", fontWeight: "800", color: "#0f172a", margin: "10px 0" }}>
                  Trending
                </h4>
                <div onClick={() => handleCategoryNav("All")} style={{ padding: "10px 0", cursor: "pointer", fontSize: "14px", color: "#334155" }}>
                  Bestsellers
                </div>
                <div onClick={() => handleCategoryNav("All")} style={{ padding: "10px 0", cursor: "pointer", fontSize: "14px", color: "#334155" }}>
                  New Releases
                </div>
              </div>

              <hr style={{ border: "none", borderTop: "1px solid #e2e8f0", margin: "6px 0" }} />

              <div style={{ padding: "0 20px 10px" }}>
                <h4 style={{ fontSize: "15px", fontWeight: "800", color: "#0f172a", margin: "10px 0" }}>
                  Digital Content and Devices
                </h4>
                {[
                  { label: "Echo & Alexa Wearables", cat: "Wearables" },
                  { label: "Smart Gadgets & Electronics", cat: "Electronics" },
                  { label: "ByteCart Prime Video", cat: "Lifestyle" },
                  { label: "ByteCart Music & Audio", cat: "Electronics" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleCategoryNav(item.cat)}
                    style={{ padding: "10px 0", cursor: "pointer", fontSize: "14px", color: "#334155", display: "flex", justifyContent: "space-between" }}
                  >
                    <span>{item.label}</span>
                    <span style={{ color: "#94a3b8" }}>›</span>
                  </div>
                ))}
              </div>

              <hr style={{ border: "none", borderTop: "1px solid #e2e8f0", margin: "6px 0" }} />

              <div style={{ padding: "0 20px 10px" }}>
                <h4 style={{ fontSize: "15px", fontWeight: "800", color: "#0f172a", margin: "10px 0" }}>
                  Shop by Category
                </h4>
                {[
                  { label: "Mobiles, Computers & Electronics", cat: "Electronics" },
                  { label: "Smart Watches & Wearables", cat: "Wearables" },
                  { label: "Footwear & Sports Shoes", cat: "Footwear" },
                  { label: "Men's & Women's Fashion", cat: "Fashion" },
                  { label: "Home, Kitchen & Lifestyle", cat: "Lifestyle" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleCategoryNav(item.cat)}
                    style={{ padding: "10px 0", cursor: "pointer", fontSize: "14px", color: "#334155", display: "flex", justifyContent: "space-between" }}
                  >
                    <span>{item.label}</span>
                    <span style={{ color: "#94a3b8" }}>›</span>
                  </div>
                ))}
              </div>

              <hr style={{ border: "none", borderTop: "1px solid #e2e8f0", margin: "6px 0" }} />

              <div style={{ padding: "0 20px 10px" }}>
                <h4 style={{ fontSize: "15px", fontWeight: "800", color: "#0f172a", margin: "10px 0" }}>
                  Programs & Features
                </h4>
                <div onClick={() => { setIsMenuOpen(false); navigate("/orders"); }} style={{ padding: "10px 0", cursor: "pointer", fontSize: "14px", color: "#334155", display: "flex", justifyContent: "space-between" }}>
                  <span>Track Package & Orders</span>
                  <span style={{ color: "#94a3b8" }}>›</span>
                </div>
                <div onClick={() => { setIsMenuOpen(false); navigate("/wishlist"); }} style={{ padding: "10px 0", cursor: "pointer", fontSize: "14px", color: "#334155", display: "flex", justifyContent: "space-between" }}>
                  <span>Your Wishlist (Saved Items)</span>
                  <span style={{ color: "#94a3b8" }}>›</span>
                </div>
                <div onClick={() => { setIsMenuOpen(false); navigate("/cart"); }} style={{ padding: "10px 0", cursor: "pointer", fontSize: "14px", color: "#334155", display: "flex", justifyContent: "space-between" }}>
                  <span>My ByteCart Bag</span>
                  <span style={{ color: "#94a3b8" }}>›</span>
                </div>
              </div>

              <hr style={{ border: "none", borderTop: "1px solid #e2e8f0", margin: "6px 0" }} />

              <div style={{ padding: "0 20px 20px" }}>
                <h4 style={{ fontSize: "15px", fontWeight: "800", color: "#0f172a", margin: "10px 0" }}>
                  Help & Settings
                </h4>
                <div onClick={() => { setIsMenuOpen(false); navigate("/orders"); }} style={{ padding: "10px 0", cursor: "pointer", fontSize: "14px", color: "#334155" }}>
                  Your Account
                </div>
                <div onClick={() => { setIsMenuOpen(false); alert("ByteCart Support 24x7: 1800-BYTE-CART | support@bytecart.com"); }} style={{ padding: "10px 0", cursor: "pointer", fontSize: "14px", color: "#334155" }}>
                  Customer Service
                </div>
                {user ? (
                  <div onClick={handleLogout} style={{ padding: "10px 0", cursor: "pointer", fontSize: "14px", color: "#ef4444", fontWeight: "700" }}>
                    Sign Out
                  </div>
                ) : (
                  <div onClick={() => { setIsMenuOpen(false); navigate("/login"); }} style={{ padding: "10px 0", cursor: "pointer", fontSize: "14px", color: "#2563eb", fontWeight: "700" }}>
                    Sign In
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;