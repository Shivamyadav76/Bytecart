import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("bytecart_orders");
      const list = stored ? JSON.parse(stored) : [];
      setOrders(Array.isArray(list) ? list : []);
    } catch (e) {
      setOrders([]);
    }
  }, []);

  // Print/Download PDF Tax Invoice
  const handleDownloadInvoice = (order) => {
    const printWindow = window.open("", "_blank");
    const itemsHtml = order.items
      ?.map(
        (it) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${it.title}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${it.quantity || 1}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">₹${it.price}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">₹${it.price * (it.quantity || 1)}</td>
      </tr>`
      )
      .join("");

    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice_${order.orderId}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 30px; color: #111; }
            .header { display: flex; justify-content: space-between; border-bottom: 2px solid #2563eb; padding-bottom: 15px; margin-bottom: 20px; }
            .badge { background: #2563eb; color: #fff; padding: 4px 8px; border-radius: 4px; font-weight: bold; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th { background: #f3f4f6; padding: 10px; text-align: left; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h1 style="margin: 0; color: #0f172a;">bytecart <span class="badge">PRO</span></h1>
              <p style="margin: 4px 0 0; color: #64748b; font-size: 13px;">Official GST Retail Invoice</p>
            </div>
            <div style="text-align: right; font-size: 13px;">
              <strong>Invoice #:</strong> ${order.orderId}<br/>
              <strong>Date:</strong> ${order.date}<br/>
              <strong>Status:</strong> Confirmed & Paid
            </div>
          </div>

          <div style="margin-bottom: 25px; font-size: 14px;">
            <strong>Billed & Delivered To:</strong><br/>
            ${order.shipping?.fullName || "Shivam Yadav"}<br/>
            ${order.shipping?.street || "Rajpur Road"}, ${order.shipping?.city || "Dehradun"} - ${order.shipping?.pincode || "248001"}<br/>
            Phone: ${order.shipping?.phone || "9876543210"}
          </div>

          <table>
            <thead>
              <tr>
                <th>Item Description</th>
                <th style="text-align: center;">Qty</th>
                <th style="text-align: right;">Price</th>
                <th style="text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <div style="text-align: right; margin-top: 25px; font-size: 16px;">
            ${order.discount ? `<p style="color: green; margin: 4px 0;">Discount: -₹${order.discount}</p>` : ""}
            <h2 style="margin: 8px 0; color: #2563eb;">Grand Total: ₹${order.total}</h2>
            <p style="font-size: 12px; color: #64748b;">(Payment Method: ${order.paymentMethod || "COD"})</p>
          </div>

          <div style="margin-top: 40px; border-top: 1px dashed #aaa; padding-top: 10px; font-size: 11px; text-align: center; color: #777;">
            This is a computer generated invoice and requires no signature. ByteCart India Logistics.
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div style={{ maxWidth: "1050px", margin: "24px auto", padding: "0 20px", fontFamily: "Inter, sans-serif" }}>
      <h1 style={{ fontSize: "26px", fontWeight: "800", marginBottom: "20px" }}>Your Orders ({orders.length})</h1>

      {orders.length === 0 ? (
        <div style={{ background: "#fff", padding: "50px", borderRadius: "12px", border: "1px solid #e2e8f0", textAlign: "center" }}>
          <p style={{ color: "#64748b", fontSize: "16px", marginBottom: "16px" }}>No orders recorded yet.</p>
          <Link to="/" style={{ background: "#2563eb", color: "#fff", padding: "10px 22px", borderRadius: "8px", textDecoration: "none", fontWeight: "700" }}>
            Explore Catalog
          </Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {orders.map((o) => (
            <div key={o.orderId} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
              <div style={{ background: "#f8fafc", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px", borderBottom: "1px solid #e2e8f0" }}>
                <div><div>ORDER PLACED</div><strong style={{ color: "#0f172a" }}>{o.date}</strong></div>
                <div><div>TOTAL</div><strong style={{ color: "#0f172a" }}>₹{o.total}</strong></div>
                <div><div>ORDER #</div><strong style={{ color: "#2563eb", fontFamily: "monospace" }}>{o.orderId}</strong></div>
                <button
                  onClick={() => handleDownloadInvoice(o)}
                  style={{ background: "#2563eb", color: "#fff", border: "none", padding: "6px 14px", borderRadius: "6px", fontWeight: "700", cursor: "pointer", fontSize: "12px" }}
                >
                  📄 Download Tax Invoice (PDF)
                </button>
              </div>

              <div style={{ padding: "20px" }}>
                <div style={{ color: "#16a34a", fontWeight: "800", fontSize: "14px", marginBottom: "14px" }}>
                  ✓ Confirmed & Processing for Dispatch
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {o.items?.map((it, idx) => (
                    <div key={idx} style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                      <img src={it.image} alt={it.title} style={{ width: "65px", height: "65px", objectFit: "contain" }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: "700", fontSize: "14px", color: "#0f172a" }}>{it.title}</div>
                        <div style={{ fontSize: "12px", color: "#64748b" }}>Qty: {it.quantity || 1} × ₹{it.price}</div>
                      </div>
                      <div style={{ fontWeight: "800", fontSize: "15px" }}>₹{it.price * (it.quantity || 1)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;