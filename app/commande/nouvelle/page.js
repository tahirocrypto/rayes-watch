"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../../lib/cart-context";

const WILAYAS = [
  "Alger","Oran","Constantine","Blida","Batna","Sétif","Annaba","Tlemcen",
  "Béjaïa","Tizi Ouzou","Bouira","Boumerdès","Chlef","Médéa","Mostaganem",
  "Skikda","Sidi Bel Abbès","Biskra","Tébessa","El Oued","Ghardaïa","Autre wilaya",
];

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [form, setForm] = useState({ customerName: "", phone: "", wilaya: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "خطأ");
      clearCart();
      router.push(`/commande/${data.orderId}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return <main className="px-[5%] py-24 text-center text-muted">السلة فارغة.</main>;
  }

  return (
    <main className="px-[5%] py-16 max-w-lg mx-auto">
      <h1 className="font-display text-3xl mb-8">Finaliser la commande</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required placeholder="Nom complet"
          className="w-full bg-ink2 border border-brass/20 rounded-sm px-4 py-3 outline-none focus:border-brass"
          value={form.customerName}
          onChange={(e) => setForm({ ...form, customerName: e.target.value })}
        />
        <input
          required placeholder="Téléphone" type="tel"
          className="w-full bg-ink2 border border-brass/20 rounded-sm px-4 py-3 outline-none focus:border-brass"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <select
          required
          className="w-full bg-ink2 border border-brass/20 rounded-sm px-4 py-3 outline-none focus:border-brass"
          value={form.wilaya}
          onChange={(e) => setForm({ ...form, wilaya: e.target.value })}
        >
          <option value="">— Choisir la wilaya —</option>
          {WILAYAS.map((w) => <option key={w} value={w}>{w}</option>)}
        </select>
        <textarea
          required placeholder="Adresse complète"
          className="w-full bg-ink2 border border-brass/20 rounded-sm px-4 py-3 outline-none focus:border-brass"
          rows={3}
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
        <div className="flex justify-between font-mono text-lg border-t border-brass/15 pt-4">
          <span>Total (paiement à la livraison)</span>
          <span className="text-brassLight">{total.toLocaleString("fr-FR")} DA</span>
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          disabled={loading}
          className="w-full bg-brass text-ink font-semibold px-6 py-3.5 rounded-sm hover:bg-brassLight transition disabled:opacity-50"
        >
          {loading ? "Envoi..." : "Confirmer la commande"}
        </button>
      </form>
    </main>
  );
}
