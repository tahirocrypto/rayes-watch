const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const products = [
    {
      slug: "explorateur",
      name: "L'Explorateur",
      edition: "Édition Explorateur",
      description: "Cadran sobre, boîtier acier inox 40mm — pensé pour un usage quotidien. Étanchéité 5 ATM, garantie 6 mois.",
      price: 8900,
      stock: 14,
    },
    {
      slug: "plongeur",
      name: "Le Plongeur",
      edition: "Édition Plongée",
      description: "Lunette tournante, étanchéité renforcée, style sport-chic. Bracelet acier ou caoutchouc au choix.",
      price: 9500,
      stock: 9,
    },
    {
      slug: "gmt",
      name: "Le GMT",
      edition: "Édition Voyageur",
      description: "Second fuseau horaire, lunette bicolore — pour ceux qui bougent entre plusieurs villes.",
      price: 10200,
      stock: 6,
    },
    {
      slug: "classique",
      name: "Le Classique",
      edition: "Édition Classique",
      description: "Bracelet jubilé, cadran soleillé — l'élégance intemporelle pour toutes les occasions.",
      price: 8400,
      stock: 20,
    },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    });
  }
  console.log("Seed terminé ✔");
}

main().finally(() => prisma.$disconnect());
