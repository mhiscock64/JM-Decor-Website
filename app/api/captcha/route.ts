import { NextResponse } from "next/server";
import { issueCaptcha } from "@/lib/captcha";
import type { Locale } from "@/lib/types";

export async function GET(request: Request) {
  const lang = new URL(request.url).searchParams.get("lang");
  const locale: Locale = lang === "fr" ? "fr" : "en";
  return NextResponse.json(issueCaptcha(locale));
}
