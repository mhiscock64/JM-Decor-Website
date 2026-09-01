import { NextResponse } from "next/server";
import { verifyCaptcha } from "@/lib/captcha";

type CartItem = {
  id: string;
  name: string;
  type: string;
  price: number;
  unit: string;
  quantity: number;
};

type QuoteBody = {
  fullName?: string;
  email?: string;
  phone?: string;
  eventDate?: string;
  venue?: string;
  guestCount?: number;
  notes?: string;
  cartItems?: CartItem[];
  subtotal?: number;
  captchaToken?: string;
  captchaAnswer?: string;
  locale?: string;
};

export async function POST(request: Request) {
  let body: QuoteBody;
  try {
    body = (await request.json()) as QuoteBody;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const fullName = body.fullName?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  if (!fullName || fullName.length > 100) {
    return NextResponse.json({ error: "Please enter your full name." }, { status: 400 });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }
  if (!body.captchaToken || !body.captchaAnswer || !verifyCaptcha(body.captchaToken, body.captchaAnswer)) {
    return NextResponse.json(
      { error: "The spam check answer is incorrect. Please try again." },
      { status: 400 },
    );
  }

  const quote = {
    receivedAt: new Date().toISOString(),
    fullName,
    email,
    phone: body.phone?.slice(0, 30),
    eventDate: body.eventDate,
    venue: body.venue?.slice(0, 120),
    guestCount: body.guestCount,
    notes: body.notes?.slice(0, 1000),
    cartItems: Array.isArray(body.cartItems) ? body.cartItems.slice(0, 50) : [],
    subtotal: body.subtotal ?? 0,
    locale: body.locale === "fr" ? "fr" : "en",
  };

  console.info("[atelier-lumiere] quote request", quote);

  return NextResponse.json({ ok: true });
}
