"use client";
import { useState } from "react";
import { useCart } from "../lib/cart-context";
import Link from "next/link";

export default function AddToCartButton({ product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <div className="flex gap-3">
      <button
        onClick={() => {
          addItem(product);
          setAdded(true);
        }}
        className="bg-brass text-ink font-semibold px-6 py-3 rounded-sm hover:bg-brassLight transition"
      >
        Ajouter au panier
      </button>
      {added && (
        <Link href="/panier" className="border border-brass px-6 py-3 rounded-sm text-sm self-center">
          Voir le panier →
        </Link>
      )}
    </div>
  );
}
