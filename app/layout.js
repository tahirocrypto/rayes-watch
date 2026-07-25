import "./globals.css";
import { CartProvider } from "../lib/cart-context";
import Header from "../components/Header";

export const metadata = {
  title: "Rayes Watch — Chaque Seconde Parle",
  description: "Boutique en ligne de montres homage en Algérie. Livraison 58 wilayas, paiement à la livraison.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Work+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ink text-textLight font-body">
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
