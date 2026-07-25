"use client";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  async function loadData() {
    const [o, p] = await Promise.all([
      fetch("/api/admin/orders").then((r) => r.json()),
      fetch("/api/products").then((r) => r.json()),
    ]);
    setOrders(Array.isArray(o) ? o : []);
    setProducts(p);
  }

  async function handleLogin(e) {
    e.preventDefault();
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthed(true);
      loadData();
    } else {
      setError("كلمة السر خاطئة");
    }
  }

  async function updateStatus(id, status) {
    await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    loadData();
  }

  async function updateStock(id, stock) {
    await fetch("/api/admin/products", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, stock }),
    });
    loadData();
  }

  if (!authed) {
    return (
      <main className="px-[5%] py-24 max-w-sm mx-auto">
        <h1 className="font-display text-2xl mb-6">Espace Admin</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password" placeholder="Mot de passe"
            className="w-full bg-ink2 border border-brass/20 rounded-sm px-4 py-3 outline-none focus:border-brass"
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button className="w-full bg-brass text-ink font-semibold px-6 py-3 rounded-sm">Entrer</button>
        </form>
      </main>
    );
  }

  return (
    <main className="px-[5%] py-12 space-y-12">
      <section>
        <h2 className="font-display text-2xl mb-4">Commandes ({orders.length})</h2>
        <div className="space-y-3">
          {orders.map((o) => (
            <div key={o.id} className="bg-ink2 border border-brass/15 rounded-sm p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-display">{o.customerName} — {o.phone}</div>
                  <div className="text-muted text-sm">{o.wilaya} · {o.address}</div>
                </div>
                <select
                  value={o.status}
                  onChange={(e) => updateStatus(o.id, e.target.value)}
                  className="bg-ink border border-brass/30 rounded-sm px-2 py-1 text-sm font-mono"
                >
                  {["nouvelle","confirmee","expediee","livree","annulee"].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="font-mono text-xs text-muted">
                {o.items.map((i) => `${i.product.name} ×${i.quantity}`).join(", ")}
              </div>
              <div className="font-mono text-brassLight mt-1">{o.total.toLocaleString("fr-FR")} DA</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl mb-4">Stock produits</h2>
        <div className="space-y-3">
          {products.map((p) => (
            <div key={p.id} className="flex items-center justify-between bg-ink2 border border-brass/15 rounded-sm p-4">
              <span className="font-display">{p.name}</span>
              <input
                type="number"
                defaultValue={p.stock}
                onBlur={(e) => updateStock(p.id, e.target.value)}
                className="w-24 bg-ink border border-brass/30 rounded-sm px-3 py-1.5 font-mono text-right"
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
