import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "../../../../lib/db";

function checkAuth() {
  const session = cookies().get("admin_session")?.value;
  return session === process.env.ADMIN_PASSWORD;
}

export async function PATCH(req) {
  if (!checkAuth()) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  const { id, stock, price } = await req.json();
  const data = {};
  if (stock !== undefined) data.stock = Number(stock);
  if (price !== undefined) data.price = Number(price);
  const product = await prisma.product.update({ where: { id }, data });
  return NextResponse.json(product);
}
