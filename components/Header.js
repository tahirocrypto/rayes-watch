"use client";
import Link from "next/link";
import { useCart } from "../lib/cart-context";

export default function Header() {
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-[5%] py-4 bg-ink/90 backdrop-blur border-b border-brass/20">
      <Link href="/" className="font-display text-xl tracking-wide">
        RAYES <span className="text-brass">WATCH</span>
      </Link>
      <nav className="hidden md:flex gap-8 text-sm">
        <Link href="/#collection" className="opacity-80 hover:opacity-100 hover:text-brassLight">Collection</Link>
        <Link href="/panier" className="opacity-80 hover:opacity-100 hover:text-brassLight">
          Panier {count > 0 && <span className="text-brass">({count})</span>}
        </Link>
      </nav>
      <Link href="/panier" className="border border-brass px-4 py-2 rounded-sm text-sm">
        Panier ({count})
      </Link>
    </header>
  );
}
