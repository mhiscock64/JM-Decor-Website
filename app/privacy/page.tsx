import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { langAlts } from "@/lib/seo";
import { copy } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const fr = (await headers()).get("x-jm-locale") === "fr";
  return fr
    ? {
        title: "Politique de confidentialité",
        description:
          "Politique de confidentialité de Décorations de Mariage Montréal. Renseignements recueillis pour une soumission, témoins essentiels et vos droits au Québec.",
        alternates: { canonical: "/fr/privacy", languages: langAlts("/privacy", "/fr/privacy") },
        openGraph: { title: "Politique de confidentialité", url: "/fr/privacy", locale: "fr_CA" },
      }
    : {
        title: "Privacy policy",
        description:
          "Privacy policy for Montreal Wedding Decorations. What we collect for a quote, the essential language cookie, and your rights in Quebec.",
        alternates: { canonical: "/privacy", languages: langAlts("/privacy", "/fr/privacy") },
        openGraph: { title: "Privacy policy", url: "/privacy", locale: "en_CA" },
      };
}

export default async function Page() {
  const fr = (await headers()).get("x-jm-locale") === "fr";
  const other = fr ? "/privacy" : "/fr/privacy";

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <p className="font-body text-[12px] font-medium uppercase tracking-[0.3em] text-sage">
        {fr ? "Loi 25 · Québec" : "Law 25 · Quebec"}
      </p>
      <h1 className="mt-4 font-display text-5xl font-medium text-balance">
        {fr ? "Politique de confidentialité" : "Privacy policy"}
      </h1>
      <p className="mt-4 font-body text-[13px] text-ink/50">
        {fr ? "En vigueur le 22 octobre 2026." : "Effective 22 October 2026."}{" "}
        <Link href={other} className="underline underline-offset-2 hover:text-ink">
          {fr ? "English" : "Français"}
        </Link>
      </p>

      {fr ? <French /> : <English />}
    </article>
  );
}

function English() {
  return (
    <div className="mt-10 space-y-8 font-body text-[15px] leading-relaxed text-ink/80">
      <section>
        <h2 className="font-display text-2xl text-ink">Who we are</h2>
        <p className="mt-3">
          Montreal Wedding Decorations (Décorations de Mariage Montréal) styles weddings in Greater Montréal.
          The person responsible for the protection of personal information can be reached at{" "}
          <a className="underline underline-offset-2" href={`mailto:${copy.email}`}>{copy.email}</a>.
        </p>
      </section>
      <section>
        <h2 className="font-display text-2xl text-ink">What we collect</h2>
        <p className="mt-3">
          When you request a quote we collect the details you type: name, email, phone, event date, venue,
          guest count, notes, and the décor list in your request. Your cart stays in your browser until you
          send that request. We also store a language preference so the site stays in English or French.
        </p>
      </section>
      <section>
        <h2 className="font-display text-2xl text-ink">Why</h2>
        <p className="mt-3">
          We use those details only to answer your request, price delivery and setup, and carry out the
          booking you accept. We do not sell personal information, and we do not use it for advertising.
        </p>
      </section>
      <section>
        <h2 className="font-display text-2xl text-ink">Cookies and tracking</h2>
        <p className="mt-3">
          One essential cookie, <span className="text-ink">jm-decor-lang</span>, remembers French or English.
          A second cookie, <span className="text-ink">jm-consent</span>, remembers your choice on this notice.
          We do not set advertising or analytics cookies, and we do not load non-essential tracking. Staff
          sign-in uses a separate session cookie that is not set for visitors.
        </p>
      </section>
      <section>
        <h2 className="font-display text-2xl text-ink">Where it is kept</h2>
        <p className="mt-3">
          The site is hosted for us, and quote records are stored so we can reply. Those providers act on our
          instructions. We keep a quote for as long as we need it to answer, deliver the event, and keep our
          records, then we delete it. You can ask us to delete it sooner.
        </p>
      </section>
      <section>
        <h2 className="font-display text-2xl text-ink">Your rights</h2>
        <p className="mt-3">
          You may ask to see the information we hold, have it corrected, or withdraw consent for a quote we
          have not yet fulfilled. Write to{" "}
          <a className="underline underline-offset-2" href={`mailto:${copy.email}`}>{copy.email}</a>.
          You may also file a complaint with the Commission d’accès à l’information du Québec at{" "}
          <a className="underline underline-offset-2" href="https://www.cai.gouv.qc.ca">cai.gouv.qc.ca</a>.
        </p>
      </section>
    </div>
  );
}

function French() {
  return (
    <div className="mt-10 space-y-8 font-body text-[15px] leading-relaxed text-ink/80">
      <section>
        <h2 className="font-display text-2xl text-ink">Qui nous sommes</h2>
        <p className="mt-3">
          Décorations de Mariage Montréal prépare le décor des mariages du Grand Montréal. La personne responsable de
          la protection des renseignements personnels peut être jointe à{" "}
          <a className="underline underline-offset-2" href={`mailto:${copy.email}`}>{copy.email}</a>.
        </p>
      </section>
      <section>
        <h2 className="font-display text-2xl text-ink">Ce que nous recueillons</h2>
        <p className="mt-3">
          Quand vous demandez une soumission, nous recueillons ce que vous inscrivez : nom, courriel,
          téléphone, date, lieu, nombre d’invités, notes et la liste de décor jointe à la demande. Le panier
          reste dans votre navigateur tant que vous n’envoyez pas la demande. Nous retenons aussi la langue
          choisie, français ou anglais.
        </p>
      </section>
      <section>
        <h2 className="font-display text-2xl text-ink">Pourquoi</h2>
        <p className="mt-3">
          Ces renseignements servent uniquement à répondre à votre demande, à chiffrer la livraison et
          l’installation, et à réaliser la réservation que vous acceptez. Nous ne vendons pas les
          renseignements personnels et nous ne les utilisons pas pour la publicité.
        </p>
      </section>
      <section>
        <h2 className="font-display text-2xl text-ink">Témoins et suivi</h2>
        <p className="mt-3">
          Un témoin essentiel, <span className="text-ink">jm-decor-lang</span>, retient le français ou
          l’anglais. Un second témoin, <span className="text-ink">jm-consent</span>, retient votre choix sur
          cet avis. Nous ne déposons pas de témoin publicitaire ou analytique, et nous ne chargeons pas de
          suivi non essentiel. La connexion du personnel utilise un témoin de session distinct, qui n’est pas
          déposé pour les visiteurs.
        </p>
      </section>
      <section>
        <h2 className="font-display text-2xl text-ink">Où c’est conservé</h2>
        <p className="mt-3">
          Le site est hébergé pour nous, et les soumissions sont conservées afin que nous puissions répondre.
          Ces fournisseurs agissent selon nos instructions. Nous gardons une soumission le temps de répondre,
          de livrer l’événement et de tenir nos dossiers, puis nous la supprimons. Vous pouvez demander une
          suppression plus tôt.
        </p>
      </section>
      <section>
        <h2 className="font-display text-2xl text-ink">Vos droits</h2>
        <p className="mt-3">
          Vous pouvez demander à consulter les renseignements que nous détenons, les faire corriger ou retirer
          votre consentement pour une soumission qui n’est pas encore réalisée. Écrivez à{" "}
          <a className="underline underline-offset-2" href={`mailto:${copy.email}`}>{copy.email}</a>.
          Vous pouvez aussi porter plainte à la Commission d’accès à l’information du Québec :{" "}
          <a className="underline underline-offset-2" href="https://www.cai.gouv.qc.ca">cai.gouv.qc.ca</a>.
        </p>
      </section>
    </div>
  );
}
