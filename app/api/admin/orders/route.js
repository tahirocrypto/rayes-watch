import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "../../../../lib/db";

function checkAuth() {
  const session = cookies().get("admin_session")?.value;
  return session === process.env.ADMIN_PASSWORD;
}

export async function GET() {
  if (!checkAuth()) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: { include: { product: true } } },
  });
  return NextResponse.json(orders);
}

export async function PATCH(req) {
  if (!checkAuth()) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  const { id, status } = await req.json();
  const order = await prisma.order.update({ where: { id }, data: { status } });
  return NextResponse.json(order);
}
