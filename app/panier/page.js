"use client";
import { useCart } from "../../lib/cart-context";
import Link from "next/link";

export default function CartPage() {
  const { items, updateQuantity, total } = useCart();

  if (items.length === 0) {
    return (
      <main className="px-[5%] py-24 text-center">
        <p className="text-muted mb-6">Votre panier est vide.</p>
        <Link href="/" className="text-brass border-b border-brass pb-0.5">Retour à la collection</Link>
      </main>
    );
  }

  return (
    <main className="px-[5%] py-16 max-w-2xl mx-auto">
      <h1 className="font-display text-3xl mb-8">Votre panier</h1>
      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div key={item.productId} className="flex items-center justify-between bg-ink2 border border-brass/15 rounded-sm p-4">
            <div>
              <div className="font-display">{item.name}</div>
              <div className="font-mono text-sm text-brassLight">{item.price.toLocaleString("fr-FR")} DA</div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                className="w-8 h-8 border border-brass/30 rounded-sm"
              >−</button>
              <span className="font-mono">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                className="w-8 h-8 border border-brass/30 rounded-sm"
              >+</button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between font-mono text-lg mb-8 border-t border-brass/15 pt-4">
        <span>Total</span>
        <span className="text-brassLight">{total.toLocaleString("fr-FR")} DA</span>
      </div>
      <Link
        href="/commande/nouvelle"
        className="block text-center bg-brass text-ink font-semibold px-6 py-3.5 rounded-sm hover:bg-brassLight transition"
      >
        Passer la commande (paiement à la livraison)
      </Link>
    </main>
  );
}
