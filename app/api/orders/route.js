import { NextResponse } from "next/server";
import { prisma } from "../../../lib/db";

// إنشاء طلبية جديدة (checkout)
export async function POST(req) {
  const body = await req.json();
  const { customerName, phone, wilaya, address, items } = body;

  if (!customerName || !phone || !wilaya || !address || !items?.length) {
    return NextResponse.json({ error: "معلومات ناقصة" }, { status: 400 });
  }

  // نتأكدو من الأسعار والمخزون من قاعدة البيانات (ماناخدوش الأسعار من العميل مباشرة)
  const productIds = items.map((i) => i.productId);
  const dbProducts = await prisma.product.findMany({ where: { id: { in: productIds } } });

  let total = 0;
  const orderItemsData = [];

  for (const item of items) {
    const product = dbProducts.find((p) => p.id === item.productId);
    if (!product) continue;
    if (product.stock < item.quantity) {
      return NextResponse.json(
        { error: `الكمية ديال "${product.name}" ماكافيش فالمخزون` },
        { status: 400 }
      );
    }
    total += product.price * item.quantity;
    orderItemsData.push({
      productId: product.id,
      quantity: item.quantity,
      price: product.price,
    });
  }

  const order = await prisma.order.create({
    data: {
      customerName,
      phone,
      wilaya,
      address,
      total,
      items: { create: orderItemsData },
    },
  });

  // نقصو المخزون
  for (const item of orderItemsData) {
    await prisma.product.update({
      where: { id: item.productId },
      data: { stock: { decrement: item.quantity } },
    });
  }

  return NextResponse.json({ orderId: order.id });
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id مطلوب" }, { status: 400 });
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: { include: { product: true } } },
  });
  if (!order) return NextResponse.json({ error: "الطلبية ماكايناش" }, { status: 404 });
  return NextResponse.json(order);
}
