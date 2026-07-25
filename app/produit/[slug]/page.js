import { prisma } from "../../../lib/db";
import AddToCartButton from "../../../components/AddToCartButton";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }) {
  const product = await prisma.product.findUnique({ where: { slug: params.slug } });
  if (!product) notFound();

  return (
    <main className="px-[5%] py-16 grid md:grid-cols-2 gap-12 items-center">
      <div className="aspect-square rounded-sm flex items-center justify-center bg-[radial-gradient(circle_at_40%_30%,#262E35,#14181C_75%)] border border-brass/15">
        <div className="w-[55%] aspect-square rounded-full border-2 border-brass relative">
          <div className="absolute left-1/2 top-1/2 w-[2px] h-[26%] bg-textLight origin-bottom -translate-x-1/2 -translate-y-full rotate-45" />
          <div className="absolute left-1/2 top-1/2 w-[2px] h-[34%] bg-verdigris origin-bottom -translate-x-1/2 -translate-y-full rotate-[190deg]" />
        </div>
      </div>
      <div>
        <div className="font-mono text-xs tracking-widest uppercase text-brass mb-2">{product.edition}</div>
        <h1 className="font-display text-4xl mb-4">{product.name}</h1>
        <p className="text-muted mb-6 leading-relaxed">{product.description}</p>
        <div className="font-mono text-2xl text-brassLight mb-6">
          {product.price.toLocaleString("fr-FR")} DA
        </div>
        {product.stock > 0 ? (
          <AddToCartButton product={product} />
        ) : (
          <div className="text-red-400 font-mono">Rupture de stock</div>
        )}
        <div className="mt-8 border border-brass/15 rounded-sm p-4 font-mono text-xs text-muted space-y-2">
          <div className="flex justify-between border-b border-dashed border-brass/15 pb-2">
            <span>LIVRAISON</span><span>58 WILAYAS — COD</span>
          </div>
          <div className="flex justify-between border-b border-dashed border-brass/15 pb-2">
            <span>GARANTIE</span><span>6 MOIS</span>
          </div>
          <div className="flex justify-between">
            <span>EMBALLAGE</span><span>ÉCRIN CADEAU</span>
          </div>
        </div>
      </div>
    </main>
  );
}
