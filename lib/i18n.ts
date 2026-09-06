import type { Locale } from "@/lib/types";

export const copy = {
  brand: "JM Decor",
  email: "bonjour@jmdecor.ca",
  city: { en: "Montréal, Quebec", fr: "Montréal, Québec" },
  nav: {
    gallery: { en: "Gallery", fr: "Galerie" },
    shop: { en: "Shop", fr: "Boutique" },
    quote: { en: "Request a quote", fr: "Demander une soumission" },
    cart: { en: "Cart", fr: "Panier" },
    openCart: { en: "Open cart", fr: "Ouvrir le panier" },
    menu: { en: "Menu", fr: "Menu" },
    language: { en: "Switch to French", fr: "Passer à l'anglais" },
  },
  home: {
    kicker: { en: "Montréal · Décor de mariage", fr: "Montréal · Décor de mariage" },
    title: { en: "Weddings dressed in light", fr: "Des mariages habillés de lumière" },
    lede: {
      en: "Arches, candlelight and drapery for celebrations that feel quietly luxurious. Rent a full look or purchase the pieces you will keep.",
      fr: "Arches, chandelles et voilages pour des célébrations d'un luxe discret. Louez un décor complet ou achetez les pièces que vous garderez.",
    },
    browse: { en: "Browse the catalogue", fr: "Parcourir le catalogue" },
    past: { en: "View past weddings", fr: "Voir les mariages" },
    glimpse: { en: "A glimpse of recent weddings", fr: "Un aperçu de mariages récents" },
    fullGallery: { en: "See the full gallery →", fr: "Voir toute la galerie →" },
    galleryAlt: {
      en: "Wedding décor by JM Decor in Montréal",
      fr: "Décor de mariage par JM Decor à Montréal",
    },
    tell: { en: "Tell us about your day", fr: "Parlez-nous de votre journée" },
    ctaLede: {
      en: "No payment needed now. Build a list of pieces you love and we will send a tailored quote with delivery and setup for your venue.",
      fr: "Aucun paiement maintenant. Composez une liste de pièces et nous enverrons une soumission avec livraison et installation à votre lieu.",
    },
    request: { en: "Request a quote", fr: "Demander une soumission" },
  },
  gallery: {
    kicker: { en: "2024 · Vieux-Montréal", fr: "2024 · Vieux-Montréal" },
    title: { en: "Recent weddings", fr: "Mariages récents" },
    lede: {
      en: "A selection of celebrations we styled across Montréal — from sunlit garden ceremonies to candlelit ballrooms.",
      fr: "Une sélection de célébrations que nous avons habillées à Montréal — des cérémonies de jardin ensoleillées aux salles de bal aux chandelles.",
    },
  },
  shop: {
    title: { en: "Shop & rental", fr: "Boutique et location" },
    lede: {
      en: "Rent a full look for the weekend or purchase the pieces you will keep. Delivery and setup across the island of Montréal.",
      fr: "Louez un décor pour le week-end ou achetez les pièces que vous garderez. Livraison et installation sur l'île de Montréal.",
    },
    all: { en: "All", fr: "Tout" },
    rental: { en: "Rental", fr: "Location" },
    purchase: { en: "Purchase", fr: "Achat" },
    categories: { en: "Category", fr: "Catégorie" },
    rentalTag: { en: "rental", fr: "location" },
    purchaseTag: { en: "purchase", fr: "achat" },
    rent: { en: "Rent", fr: "Louer" },
    buy: { en: "Buy", fr: "Acheter" },
    add: { en: "Add to cart", fr: "Ajouter au panier" },
    inCart: {
      en: (qty: number) => `In cart (${qty}) · Add more`,
      fr: (qty: number) => `Dans le panier (${qty}) · Ajouter`,
    },
    emptyHint: {
      en: "Add pieces to build your quote request.",
      fr: "Ajoutez des pièces pour composer votre demande de soumission.",
    },
    selected: {
      en: (count: number, total: string) =>
        `${count} piece${count > 1 ? "s" : ""} selected · estimated ${total}`,
      fr: (count: number, total: string) =>
        `${count} pièce${count > 1 ? "s" : ""} sélectionnée${count > 1 ? "s" : ""} · estimation ${total}`,
    },
    choose: {
      en: (name: string) => `Choose rent or buy for ${name}`,
      fr: (name: string) => `Choisir location ou achat pour ${name}`,
    },
  },
  cart: {
    title: { en: "Your cart", fr: "Votre panier" },
    close: { en: "Close", fr: "Fermer" },
    empty: { en: "Your cart is empty.", fr: "Votre panier est vide." },
    estimated: { en: "Estimated total", fr: "Total estimé" },
    remove: { en: "Remove", fr: "Retirer" },
    decrease: { en: "Decrease quantity", fr: "Diminuer la quantité" },
    increase: { en: "Increase quantity", fr: "Augmenter la quantité" },
    request: { en: "Request a quote", fr: "Demander une soumission" },
  },
  quote: {
    kicker: { en: "Request a quote", fr: "Demander une soumission" },
    title: { en: "Tell us about your day", fr: "Parlez-nous de votre journée" },
    lede: {
      en: "No payment needed now. Share your details and we will send a tailored quote with delivery and setup for your venue.",
      fr: "Aucun paiement maintenant. Partagez vos détails et nous enverrons une soumission avec livraison et installation à votre lieu.",
    },
    emptyCart: {
      en: "Your cart is empty —",
      fr: "Votre panier est vide —",
    },
    browse: { en: "browse the catalogue", fr: "parcourir le catalogue" },
    eventDate: { en: "Event date", fr: "Date de l'événement" },
    venue: { en: "Venue", fr: "Lieu" },
    venuePlaceholder: { en: "e.g. Château Ramezay", fr: "ex. Château Ramezay" },
    fullName: { en: "Full name", fr: "Nom complet" },
    email: { en: "Email", fr: "Courriel" },
    phone: { en: "Phone", fr: "Téléphone" },
    guests: { en: "Guest count", fr: "Nombre d'invités" },
    spam: { en: "Spam check —", fr: "Vérification —" },
    loading: { en: "loading…", fr: "chargement…" },
    answer: { en: "Your answer", fr: "Votre réponse" },
    notes: { en: "Notes for our team", fr: "Notes pour notre équipe" },
    notesPlaceholder: {
      en: "Colors, guest count, setup timing…",
      fr: "Couleurs, nombre d'invités, horaire d'installation…",
    },
    submit: { en: "Request my quote", fr: "Envoyer ma demande" },
    sending: { en: "Sending…", fr: "Envoi…" },
    thanks: { en: "Thank you", fr: "Merci" },
    thanksLede: {
      en: "Your request is in. We will reply within two business days with a tailored quote and next steps.",
      fr: "Votre demande est bien reçue. Nous répondrons sous deux jours ouvrables avec une soumission et les prochaines étapes.",
    },
    another: { en: "Submit another request", fr: "Envoyer une autre demande" },
    error: { en: "Something went wrong.", fr: "Une erreur s'est produite." },
  },
  notFound: {
    title: { en: "Page not found", fr: "Page introuvable" },
    lede: {
      en: "The page you're looking for doesn't exist or has been moved.",
      fr: "La page que vous cherchez n'existe pas ou a été déplacée.",
    },
    home: { en: "Go home", fr: "Retour à l'accueil" },
  },
} as const;

export function t(value: { en: string; fr: string }, locale: Locale) {
  return value[locale];
}
