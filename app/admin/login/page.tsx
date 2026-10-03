import { loginAction } from "@/lib/admin/actions";
import { staffCount } from "@/lib/admin/auth";
import { hasDatabase } from "@/lib/admin/db";

export const metadata = { title: "Staff login", robots: { index: false, follow: false } };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;
  const ready = hasDatabase();
  const first = ready ? (await staffCount()) === 0 : false;
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-16">
      <p className="font-body text-[12px] uppercase tracking-[0.28em] text-sage">JM Decor</p>
      <h1 className="mt-3 font-display text-4xl">Staff login</h1>
      <p className="mt-3 font-body text-[14px] leading-relaxed text-ink/65">
        {first
          ? "No staff account exists yet. The first sign-in creates the admin."
          : "Sign in to manage products, inventory, quotes, and orders."}
      </p>
      {!ready ? (
        <p className="mt-6 rounded-xl bg-cream p-4 font-body text-[13px] leading-relaxed text-ink/70">
          This deployment has no database yet. Add <code>DATABASE_URL</code> in Vercel (Neon or any Postgres), then redeploy. The public site keeps working without it.
        </p>
      ) : null}
      <form action={loginAction} className="mt-8 space-y-4">
        {first ? (
          <label className="block font-body text-[13px]">
            Name
            <input name="name" defaultValue="JM Decor" className="mt-1 w-full rounded-lg border border-ink/15 bg-ivory px-3 py-2" />
          </label>
        ) : null}
        <label className="block font-body text-[13px]">
          Email
          <input name="email" type="email" required className="mt-1 w-full rounded-lg border border-ink/15 bg-ivory px-3 py-2" />
        </label>
        <label className="block font-body text-[13px]">
          Password
          <input name="password" type="password" required minLength={first ? 8 : 1} className="mt-1 w-full rounded-lg border border-ink/15 bg-ivory px-3 py-2" />
        </label>
        {params.error ? <p className="font-body text-[13px] text-red-700">{params.error}</p> : null}
        <button type="submit" className="w-full rounded-full bg-ink px-4 py-2.5 font-body text-[13px] text-ivory">
          {first ? "Create admin and sign in" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
