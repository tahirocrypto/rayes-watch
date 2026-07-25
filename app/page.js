import { prisma } from "../lib/db";
import ProductCard from "../components/ProductCard";

async function getProducts() {
  return prisma.product.findMany({ orderBy: { createdAt: "asc" } });
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main>
      {/* HERO */}
      <section className="relative flex flex-col-reverse md:flex-row items-center justify-between gap-8 px-[5%] py-20 min-h-[85vh]">
        <div className="max-w-lg text-center md:text-left">
          <div className="font-mono text-xs tracking-widest uppercase text-brass">
            Boutique en ligne — Algérie
          </div>
          <h1 className="font-display text-[clamp(2.4rem,5.5vw,4.2rem)] mt-3 mb-5">
            Chaque <em className="text-brassLight not-italic italic">seconde</em>
            <br />
            parle.
          </h1>
          <p className="text-muted mb-8 max-w-md mx-auto md:mx-0">
            Des montres d'inspiration homage, sélectionnées pour leur précision — livrées avec soin
            dans les 58 wilayas, paiement à la livraison, écrin cadeau inclus.
          </p>
          <a
            href="#collection"
            className="inline-block bg-brass text-ink font-semibold px-7 py-3.5 rounded-sm hover:bg-brassLight transition"
          >
            Découvrir la collection
          </a>
        </div>
        <div className="relative w-[60vw] md:w-[380px] aspect-square shrink-0">
          <div className="w-full h-full rounded-full border border-brass/40 bg-[radial-gradient(circle_at_35%_30%,#232A31,#101417_72%)] shadow-2xl relative">
            <div className="absolute top-[26%] left-1/2 -translate-x-1/2 text-center font-mono text-[0.6rem] tracking-widest text-muted uppercase">
              Rayes Watch<br />oran
            </div>
            <div className="absolute left-1/2 top-1/2 w-[5px] h-[22%] bg-brassLight rounded origin-bottom -translate-x-1/2 -translate-y-full rotate-[298deg]" />
            <div className="absolute left-1/2 top-1/2 w-[3px] h-[32%] bg-textLight rounded origin-bottom -translate-x-1/2 -translate-y-full rotate-[140deg]" />
            <div className="absolute left-1/2 top-1/2 w-[1.5px] h-[36%] bg-verdigris origin-bottom -translate-x-1/2 -translate-y-full tick-hand" />
            <div className="absolute left-1/2 top-1/2 w-2.5 h-2.5 bg-brass rounded-full -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <div className="flex flex-wrap justify-around gap-6 px-[5%] py-6 bg-ink2 border-y border-brass/10 font-mono text-xs text-muted">
        <div>🚚 Livraison — <span className="text-brassLight">58 wilayas</span></div>
        <div>💵 Paiement — <span className="text-brassLight">à la livraison</span></div>
        <div>🎁 Emballage — <span className="text-brassLight">écrin cadeau offert</span></div>
      </div>

      {/* COLLECTION */}
      <section id="collection" className="px-[5%] py-20">
        <div className="max-w-xl mb-12">
          <div className="font-mono text-xs tracking-widest uppercase text-brass">La sélection</div>
          <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.4rem)] mt-2">
            Quatre silhouettes, un seul mouvement.
          </h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <footer className="px-[5%] py-10 border-t border-brass/10 text-center text-muted text-sm">
        © 2026 Rayes Watch — oran, Algérie
      </footer>
    </main>
  );
}
