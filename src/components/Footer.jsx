import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openInfo = (title, content, badge = "ByteCart Official") => {
    setActiveModal({ title, content, badge });
  };

  return (
    <>
      <footer style={{ fontFamily: "Inter, system-ui, sans-serif", marginTop: "auto", userSelect: "none" }}>
        {/* 1. Back to Top Button */}
        <div
          onClick={scrollToTop}
          style={{
            background: "#232f3e",
            color: "#ffffff",
            textAlign: "center",
            padding: "15px 0",
            fontSize: "13px",
            fontWeight: "700",
            cursor: "pointer",
            transition: "all 0.2s ease",
            letterSpacing: "0.5px",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#37475a")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#232f3e")}
        >
          ↑ TOP OF PAGE
        </div>

        {/* 2. Main 4-Column Links Strip */}
        <div
          style={{
            background: "#131a22",
            color: "#dddddd",
            padding: "45px 20px 35px",
            borderBottom: "1px solid #232f3e",
          }}
        >
          <div
            style={{
              maxWidth: "1180px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "36px",
            }}
          >
            {/* Column 1: Get to Know Us */}
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: "800", color: "#ffffff", marginBottom: "14px" }}>
                Get to Know Us
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px" }}>
                <li
                  onClick={() =>
                    openInfo(
                      "About ByteCart PRO",
                      "ByteCart PRO is a cutting-edge MERN stack e-commerce web platform designed with high-concurrency cloud architecture. Integrated with MongoDB Atlas, it serves thousands of verified electronics, fashion, and wearable products with lightning-fast catalog search.",
                      "Company Profile"
                    )
                  }
                  style={{ cursor: "pointer", color: "#cbd5e1" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#cbd5e1")}
                >
                  About ByteCart
                </li>
                <li
                  onClick={() =>
                    openInfo(
                      "Careers at ByteCart",
                      "We are looking for passionate Web Developers, React Specialists, and Backend Engineers. Build modern e-commerce systems with us! Send your resume to careers@bytecart.com.",
                      "Hiring 2026"
                    )
                  }
                  style={{ cursor: "pointer", color: "#cbd5e1" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#cbd5e1")}
                >
                  Careers
                </li>
                <li
                  onClick={() =>
                    openInfo(
                      "Press Releases",
                      "New Delhi: ByteCart PRO achieves record 99.9% uptime and announces pan-India 24-hour delivery coverage in partnership with leading express logistics networks.",
                      "Media Desk"
                    )
                  }
                  style={{ cursor: "pointer", color: "#cbd5e1" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#cbd5e1")}
                >
                  Press Releases
                </li>
                <li
                  onClick={() =>
                    openInfo(
                      "ByteCart Science & Tech",
                      "Powered by React Vite single-page performance, resilient MongoDB Atlas cloud clusters, and automated localStorage cart-order synchronization engine.",
                      "Tech Architecture"
                    )
                  }
                  style={{ cursor: "pointer", color: "#cbd5e1" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#cbd5e1")}
                >
                  ByteCart Science
                </li>
              </ul>
            </div>

            {/* Column 2: Connect with Us */}
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: "800", color: "#ffffff", marginBottom: "14px" }}>
                Connect with Us
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px" }}>
                <li>
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#cbd5e1", textDecoration: "none" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#cbd5e1")}
                  >
                    Facebook ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#cbd5e1", textDecoration: "none" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#cbd5e1")}
                  >
                    Twitter / X ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#cbd5e1", textDecoration: "none" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#cbd5e1")}
                  >
                    Instagram ↗
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Make Money with Us */}
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: "800", color: "#ffffff", marginBottom: "14px" }}>
                Make Money with Us
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px" }}>
                <li
                  onClick={() =>
                    openInfo(
                      "Sell on ByteCart",
                      "List your brand on ByteCart! Enjoy 0% commission for the first 30 days, instant UPI payouts, and direct access to over 5,00,000+ daily tech buyers.",
                      "Seller Hub"
                    )
                  }
                  style={{ cursor: "pointer", color: "#cbd5e1" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#cbd5e1")}
                >
                  Sell on ByteCart
                </li>
                <li
                  onClick={() =>
                    openInfo(
                      "Supply to ByteCart Retail",
                      "Direct wholesale bulk purchasing program for verified electronics, mobile accessories, and lifestyle manufacturers. Contact b2b@bytecart.com.",
                      "B2B Sourcing"
                    )
                  }
                  style={{ cursor: "pointer", color: "#cbd5e1" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#cbd5e1")}
                >
                  Supply to ByteCart
                </li>
                <li
                  onClick={() =>
                    openInfo(
                      "ByteCart Affiliate Program",
                      "Earn up to 10% referral commission on electronics and wearable product sales through your customized ByteCart tracking links.",
                      "Earn With Us"
                    )
                  }
                  style={{ cursor: "pointer", color: "#cbd5e1" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#cbd5e1")}
                >
                  Become an Affiliate
                </li>
                <li
                  onClick={() =>
                    openInfo(
                      "Fulfilment by ByteCart (FBC)",
                      "Our smart warehouses pick, pack, and ship your inventory with automated order tracking, doorstep returns, and customer care management.",
                      "Logistics Engine"
                    )
                  }
                  style={{ cursor: "pointer", color: "#cbd5e1" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#cbd5e1")}
                >
                  Fulfilment by ByteCart
                </li>
              </ul>
            </div>

            {/* Column 4: Let Us Help You */}
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: "800", color: "#ffffff", marginBottom: "14px" }}>
                Let Us Help You
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px" }}>
                <li
                  onClick={() => navigate("/login")}
                  style={{ cursor: "pointer", color: "#cbd5e1" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#cbd5e1")}
                >
                  Your Account →
                </li>
                <li
                  onClick={() => navigate("/orders")}
                  style={{ cursor: "pointer", color: "#cbd5e1" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#cbd5e1")}
                >
                  Your Orders →
                </li>
                <li
                  onClick={() =>
                    openInfo(
                      "Returns & Replacement Policy",
                      "100% Hassle-Free 7 Days Replacement Policy on electronics and lifestyle items. Go to 'Your Orders', select the item and click 'Request Replacement' to get reverse pickup scheduled.",
                      "Buyer Protection"
                    )
                  }
                  style={{ cursor: "pointer", color: "#cbd5e1" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#cbd5e1")}
                >
                  Returns & Replacement
                </li>
                <li
                  onClick={() =>
                    openInfo(
                      "24x7 Customer Support Desk",
                      "Need help with delivery or refund? Call our toll-free support line at 1800-BYTE-CART (24x7) or email us directly at support@bytecart.com.",
                      "Customer Care"
                    )
                  }
                  style={{ cursor: "pointer", color: "#cbd5e1" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#cbd5e1")}
                >
                  Help & Customer Support
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 3. Bottom Legal Copyright Strip */}
        <div
          style={{
            background: "#0d141e",
            padding: "24px 20px",
            textAlign: "center",
            fontSize: "12px",
            color: "#94a3b8",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap", marginBottom: "10px" }}>
            <span
              onClick={() => openInfo("Conditions of Use", "By using ByteCart, you agree to our standard terms of service, secure transactions, and fair usage rules.", "Legal")}
              style={{ cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
            >
              Conditions of Use
            </span>
            <span
              onClick={() => openInfo("Privacy Notice", "ByteCart strictly safeguards your customer data with 256-bit encryption. We never share customer personal information.", "Security")}
              style={{ cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
            >
              Privacy Notice
            </span>
            <span
              onClick={() => openInfo("Interest-Based Ads", "We recommend high-rated tech and lifestyle products based on your catalog search queries.", "Personalization")}
              style={{ cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
            >
              Interest-Based Ads
            </span>
          </div>
          <div>© 1996–2026, ByteCart India, Inc. Built with MERN Stack (React, Node.js & MongoDB Atlas).</div>
        </div>
      </footer>

      {/* Modern Pop-up Dialog Modal for Clicked Links */}
      {activeModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 99999,
            padding: "20px",
          }}
          onClick={() => setActiveModal(null)}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              maxWidth: "520px",
              width: "100%",
              padding: "28px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
              border: "1px solid #e2e8f0",
              animation: "fadeIn 0.2s ease-out",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span
                style={{
                  background: "#eff6ff",
                  color: "#2563eb",
                  fontWeight: "800",
                  fontSize: "11px",
                  padding: "3px 10px",
                  borderRadius: "20px",
                  textTransform: "uppercase",
                }}
              >
                {activeModal.badge}
              </span>
              <button
                onClick={() => setActiveModal(null)}
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: "20px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  color: "#64748b",
                  padding: "2px 6px",
                }}
              >
                ✕
              </button>
            </div>

            <h3 style={{ margin: "0 0 10px", fontSize: "20px", fontWeight: "800", color: "#0f172a" }}>
              {activeModal.title}
            </h3>

            <p style={{ margin: "0 0 24px", fontSize: "14px", lineHeight: "1.6", color: "#475569" }}>
              {activeModal.content}
            </p>

            <div style={{ textAlign: "right" }}>
              <button
                onClick={() => setActiveModal(null)}
                style={{
                  background: "#2563eb",
                  color: "#ffffff",
                  border: "none",
                  padding: "10px 22px",
                  borderRadius: "8px",
                  fontWeight: "700",
                  cursor: "pointer",
                  fontSize: "13px",
                }}
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;