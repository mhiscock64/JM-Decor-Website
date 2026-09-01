import { createHmac, randomUUID, timingSafeEqual } from "crypto";
import type { Locale } from "@/lib/types";

function secret() {
  return process.env.CAPTCHA_SECRET ?? "atelier-lumiere-local-secret";
}

export function issueCaptcha(locale: Locale) {
  const a = 2 + Math.floor(Math.random() * 8);
  const b = 2 + Math.floor(Math.random() * 8);
  const answer = String(a + b);
  const nonce = randomUUID();
  const signature = createHmac("sha256", secret())
    .update(`${nonce}:${answer}`)
    .digest("hex");
  return {
    token: `${nonce}.${signature}`,
    question:
      locale === "fr" ? `Combien font ${a} + ${b} ?` : `What is ${a} + ${b}?`,
  };
}

export function verifyCaptcha(token: string, answer: string) {
  const [nonce, signature] = token.split(".");
  if (!nonce || !signature) return false;
  const expected = createHmac("sha256", secret())
    .update(`${nonce}:${answer.trim()}`)
    .digest("hex");
  try {
    return timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}
