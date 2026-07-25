import { prisma } from "../../../lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function OrderConfirmation({ params }) {
  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: { items: { include: { product: true } } },
  });
  if (!order) notFound();

  return (
    <main className="px-[5%] py-20 max-w-lg mx-auto text-center">
      <div className="text-verdigris font-mono text-xs tracking-widest uppercase mb-3">Commande confirmée</div>
      <h1 className="font-display text-3xl mb-4">Merci, {order.customerName} 🎉</h1>
      <p className="text-muted mb-8">
        Votre commande #{order.id.slice(-6).toUpperCase()} a été enregistrée. Notre équipe vous contactera
        au {order.phone} pour confirmer la livraison à {order.wilaya}.
      </p>
      <div className="text-left border border-brass/15 rounded-sm p-4 mb-8 font-mono text-sm space-y-2">
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between">
            <span>{item.product.name} × {item.quantity}</span>
            <span>{(item.price * item.quantity).toLocaleString("fr-FR")} DA</span>
          </div>
        ))}
        <div className="flex justify-between border-t border-brass/15 pt-2 text-brassLight">
          <span>Total</span><span>{order.total.toLocaleString("fr-FR")} DA</span>
        </div>
      </div>
      <Link href="/" className="text-brass border-b border-brass pb-0.5">Retour à la boutique</Link>
    </main>
  );
}
