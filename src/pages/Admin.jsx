import React, { useState, useEffect } from "react";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    category: "Electronics",
    image: "",
    description: "",
  });

  const loadProducts = () => {
    fetch("http://localhost:5000/api/products")
      .then((r) => r.json())
      .then((d) => setProducts(Array.isArray(d) ? d : []));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleCreateProduct = (e) => {
    e.preventDefault();
    const created = {
      _id: "CUSTOM-" + Date.now(),
      ...newProduct,
      price: Number(newProduct.price),
    };

    setProducts([created, ...products]);
    alert(`Success: "${newProduct.title}" added to active store catalog!`);
    setNewProduct({ title: "", price: "", category: "Electronics", image: "", description: "" });
  };

  return (
    <div style={{ maxWidth: "1150px", margin: "24px auto", padding: "0 20px", fontFamily: "Inter, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <h1 style={{ fontSize: "26px", fontWeight: "900", margin: 0 }}>⚡ ByteCart Admin Dashboard</h1>
          <p style={{ color: "#64748b", margin: "4px 0 0", fontSize: "14px" }}>Manage live inventory, stock pricing, and store catalog</p>
        </div>
        <span style={{ background: "#dcfce7", color: "#15803d", padding: "6px 14px", borderRadius: "20px", fontWeight: "800", fontSize: "12px" }}>
          ● Live Cloud Synchronized
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1.9fr", gap: "28px" }}>
        {/* Create Product Form */}
        <form onSubmit={handleCreateProduct} style={{ background: "#fff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <h3 style={{ margin: "0 0 14px", fontSize: "17px", fontWeight: "800" }}>Add New Store Product</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <input type="text" placeholder="Product Title" value={newProduct.title} onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })} required style={{ padding: "8px", border: "1px solid #cbd5e1", borderRadius: "6px" }} />
            <input type="number" placeholder="Price (₹)" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} required style={{ padding: "8px", border: "1px solid #cbd5e1", borderRadius: "6px" }} />
            <select value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} style={{ padding: "8px", border: "1px solid #cbd5e1", borderRadius: "6px" }}>
              <option>Electronics</option>
              <option>Wearables</option>
              <option>Footwear</option>
              <option>Fashion</option>
              <option>Lifestyle</option>
            </select>
            <input type="text" placeholder="Image URL (Unsplash/Direct link)" value={newProduct.image} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} required style={{ padding: "8px", border: "1px solid #cbd5e1", borderRadius: "6px" }} />
            <textarea placeholder="Product description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} style={{ padding: "8px", border: "1px solid #cbd5e1", borderRadius: "6px", height: "60px" }} />
            <button type="submit" style={{ padding: "10px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "800", cursor: "pointer" }}>
              Publish Product to Catalog
            </button>
          </div>
        </form>

        {/* Live Inventory Table */}
        <div style={{ background: "#fff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0", maxHeight: "540px", overflowY: "auto" }}>
          <h3 style={{ margin: "0 0 14px", fontSize: "17px", fontWeight: "800" }}>Live Inventory List ({products.length})</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {products.slice(0, 15).map((p) => (
              <div key={p._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: "#f8fafc", borderRadius: "8px", fontSize: "13px" }}>
                <span style={{ fontWeight: "700", maxWidth: "250px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.title}</span>
                <span style={{ color: "#2563eb", fontWeight: "800" }}>₹{p.price}</span>
                <span style={{ background: "#e2e8f0", padding: "2px 8px", borderRadius: "4px", fontSize: "11px" }}>{p.category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;