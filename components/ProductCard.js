import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div className="bg-ink2 border border-brass/15 rounded-sm overflow-hidden hover:border-brass/50 hover:-translate-y-1 transition">
      <Link href={`/produit/${product.slug}`}>
        <div className="aspect-square flex items-center justify-center bg-[radial-gradient(circle_at_40%_30%,#262E35,#14181C_75%)]">
          <div className="w-[58%] aspect-square rounded-full border-2 border-brass relative">
            <div className="absolute left-1/2 top-1/2 w-[2px] h-[26%] bg-textLight origin-bottom -translate-x-1/2 -translate-y-full rotate-45" />
            <div className="absolute left-1/2 top-1/2 w-[2px] h-[34%] bg-verdigris origin-bottom -translate-x-1/2 -translate-y-full rotate-[190deg]" />
          </div>
        </div>
      </Link>
      <div className="p-5">
        <div className="font-mono text-[0.7rem] tracking-widest uppercase text-brass mb-1">
          {product.edition}
        </div>
        <h3 className="font-display text-lg mb-1">{product.name}</h3>
        <p className="text-muted text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-mono text-brassLight">{product.price.toLocaleString("fr-FR")} DA</span>
          <Link href={`/produit/${product.slug}`} className="text-sm border-b border-brass pb-0.5">
            Voir →
          </Link>
        </div>
        {product.stock <= 5 && product.stock > 0 && (
          <div className="mt-2 text-xs text-verdigris font-mono">Il reste {product.stock} pièces</div>
        )}
        {product.stock === 0 && (
          <div className="mt-2 text-xs text-red-400 font-mono">Rupture de stock</div>
        )}
      </div>
    </div>
  );
}
