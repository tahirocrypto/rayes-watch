import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req) {
  const { password } = await req.json();
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "كلمة السر خاطئة" }, { status: 401 });
  }
  cookies().set("admin_session", process.env.ADMIN_PASSWORD, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 أيام
  });
  return NextResponse.json({ ok: true });
}
