import type { Locale } from "@/lib/types";

export const copy = {
  brand: "JM Decor",
  email: "bonjour@jmdecor.ca",
  city: { en: "Montréal, Quebec", fr: "Montréal, Québec" },
  nav: {
    gallery: { en: "Gallery", fr: "Galerie" },
    shop: { en: "Shop", fr: "Boutique" },
    quote: { en: "Request a quote", fr: "Demander une soumission" },
    plan: { en: "Plan", fr: "Plan" },
    cart: { en: "Cart", fr: "Panier" },
    openCart: { en: "Open cart", fr: "Ouvrir le panier" },
    menu: { en: "Menu", fr: "Menu" },
    language: { en: "Switch to French", fr: "Passer à l'anglais" },
  },
  footer: {
    blurb: {
      en: "Wedding décor and decorations for Greater Montréal. Rent a ceremony look or purchase the pieces you will keep. Delivery and setup included in the quote.",
      fr: "Décor et décorations de mariage pour le Grand Montréal. Louez un décor de cérémonie ou achetez les pièces que vous garderez. Livraison et installation dans la soumission.",
    },
    visit: { en: "Visit", fr: "Visiter" },
    staff: { en: "Staff", fr: "Équipe" },
    areasTitle: { en: "Where we set up", fr: "Où nous installons" },
    areasPage: {
      en: "Greater Montréal wedding décor",
      fr: "Décor de mariage au Grand Montréal",
    },
    areas: {
      en: "Montréal, Laval, Longueuil, Brossard, the South Shore, the West Island, Westmount, Outremont, and Vieux-Montréal.",
      fr: "Montréal, Laval, Longueuil, Brossard, la Rive-Sud, l'Ouest-de-l'Île, Westmount, Outremont et le Vieux-Montréal.",
    },
  },
  plan: {
    kicker: { en: "Plan my day", fr: "Préparer ma journée" },
    title: { en: "A few questions about your wedding", fr: "Quelques questions sur votre mariage" },
    lede: { en: "We will suggest décor from the catalogue — then you review, edit, and request a quote. No payment, and this is not a locked package.", fr: "Nous proposons un décor du catalogue — vous le revoyez, le modifiez et demandez une soumission. Aucun paiement, et ce n'est pas un forfait figé." },
    progress: { en: (n: number, total: number) => `${n} of ${total}`, fr: (n: number, total: number) => `${n} sur ${total}` },
    continue: { en: "Continue", fr: "Continuer" },
    skip: { en: "Skip for now", fr: "Passer pour l'instant" },
    back: { en: "Back", fr: "Retour" },
    keepTitle: { en: "You already have pieces in your cart", fr: "Votre panier contient déjà des pièces" },
    keepLede: { en: "Keep them and we will add a suggested look around them, or start this plan from a clear cart.", fr: "Gardez-les et nous ajouterons un décor autour, ou repartez d'un panier vide pour ce plan." },
    keepYes: { en: "Keep my cart", fr: "Garder mon panier" },
    keepNo: { en: "Start fresh", fr: "Recommencer" },
    dateTitle: { en: "When is the celebration?", fr: "Quelle est la date?" },
    dateLede: { en: "Optional — it helps us check tent dates and setup timing.", fr: "Facultatif — cela nous aide pour les chapiteaux et l'horaire d'installation." },
    guestsTitle: { en: "About how many guests?", fr: "Environ combien d'invités?" },
    guestsLede: { en: "This sizes the tent if you need one. Tables and chairs are rented separately.", fr: "Cela dimensionne le chapiteau si vous en avez besoin. Tables et chaises en location séparée." },
    guestsCustom: { en: "Or enter a number", fr: "Ou entrez un nombre" },
    guestChip: { en: (n: number) => `${n} guests`, fr: (n: number) => `${n} invités` },
    settingTitle: { en: "Where will the day unfold?", fr: "Où se déroule la journée?" },
    indoor: { en: "Indoors", fr: "À l'intérieur" },
    indoorLede: { en: "Ballroom, loft, or hall", fr: "Salle de bal, loft ou hall" },
    outdoor: { en: "Outdoors", fr: "En extérieur" },
    outdoorLede: { en: "Garden, terrace, or park", fr: "Jardin, terrasse ou parc" },
    both: { en: "Indoors and out", fr: "Intérieur et extérieur" },
    bothLede: { en: "Ceremony outside, reception in", fr: "Cérémonie dehors, réception dedans" },
    tentTitle: { en: "Do you need a tent from us?", fr: "Avez-vous besoin d'un chapiteau?" },
    tentLede: { en: "Ivory frame tents only — no tables or chairs inside. We will size one from your guest count.", fr: "Chapiteaux ivoire uniquement — sans tables ni chaises. Nous en choisirons un selon le nombre d'invités." },
    tentYes: { en: "Yes, suggest a tent", fr: "Oui, proposez un chapiteau" },
    tentVenue: { en: "The venue already has cover", fr: "Le lieu a déjà un abri" },
    tentSkip: { en: "Not sure yet", fr: "Je ne sais pas encore" },
    moodTitle: { en: "Which mood feels closest?", fr: "Quelle ambiance vous parle?" },
    moodLede: { en: "A starting look from pieces we already rent or sell. You can swap anything in the shop after.", fr: "Un point de départ avec des pièces déjà en location ou à l'achat. Vous pourrez tout échanger ensuite." },
    reviewTitle: { en: "Your suggested look", fr: "Le décor proposé" },
    reviewLede: { en: "Add it to your quote cart, then send the request. Delivery and setup are quoted separately.", fr: "Ajoutez-le au panier de soumission, puis envoyez la demande. Livraison et installation en supplément." },
    estimated: { en: "Estimated pieces", fr: "Pièces estimées" },
    added: { en: "Look added to your cart", fr: "Décor ajouté au panier" },
    addAndQuote: { en: "Add look and request a quote", fr: "Ajouter et demander une soumission" },
    quote: { en: "Request a quote", fr: "Demander une soumission" },
    shop: { en: "Add look and keep shopping", fr: "Ajouter et continuer à magasiner" },
    skipLook: { en: "Go to quote without adding", fr: "Aller à la soumission sans ajouter" },
    chairsNote: { en: "Tables and chairs are rented separately. Tent add-ons (walls, lighting, delivery) are quoted after we see the venue.", fr: "Tables et chaises en location séparée. Options de tente (parois, éclairage, livraison) après visite du lieu." },
  },
  home: {
    kicker: { en: "Greater Montréal · Wedding décor", fr: "Grand Montréal · Décor de mariage" },
    title: { en: "Weddings dressed in light", fr: "Des mariages habillés de lumière" },
    lede: {
      en: "Wedding décor and decorations for celebrations across Greater Montréal. Arches, candlelight, and drapery you can rent for the weekend, or purchase to keep.",
      fr: "Décor et décorations de mariage pour les célébrations du Grand Montréal. Arches, chandelles et voilages à louer pour le week-end, ou à acheter pour les garder.",
    },
    browse: { en: "Browse the catalogue", fr: "Parcourir le catalogue" },
    past: { en: "View past weddings", fr: "Voir les mariages" },
    glimpse: { en: "A glimpse of recent weddings", fr: "Un aperçu de mariages récents" },
    fullGallery: { en: "See the full gallery →", fr: "Voir toute la galerie →" },
    galleryAlt: {
      en: "Wedding décor by JM Decor in Montréal",
      fr: "Décor de mariage par JM Decor à Montréal",
    },
    areaKicker: { en: "Greater Montréal", fr: "Grand Montréal" },
    areaTitle: {
      en: "Wedding décor and decorations, delivered to your venue",
      fr: "Décor et décorations de mariage, livrés à votre lieu",
    },
    areaLede: {
      en: "JM Decor styles ceremonies and receptions on the island of Montréal and across the greater area: Laval, the South Shore, and the West Island. Tell us the venue and we will quote delivery and setup.",
      fr: "JM Decor habille cérémonies et réceptions sur l'île de Montréal et dans le Grand Montréal : Laval, la Rive-Sud et l'Ouest-de-l'Île. Indiquez le lieu et nous soumissionnons la livraison et l'installation.",
    },
    areaMore: {
      en: "Wedding décor across Greater Montréal →",
      fr: "Décor de mariage au Grand Montréal →",
    },
    faqTitle: {
      en: "Questions couples ask",
      fr: "Questions fréquentes",
    },
    services: [
      {
        title: { en: "Ceremony arches & backdrops", fr: "Arches et décors de cérémonie" },
        body: {
          en: "Freestanding floral arches, drapery walls, and pedestals for garden ceremonies, lofts, and ballrooms.",
          fr: "Arches florales autoportantes, murs de voilage et socles pour jardins, lofts et salles de bal.",
        },
      },
      {
        title: { en: "Candlelight & table décor", fr: "Chandelles et décor de table" },
        body: {
          en: "Brass holders, lanterns, runners, and silk arrangements to rent, plus signs and card boxes you can keep.",
          fr: "Bougeoirs de laiton, lanternes, chemins de table et arrangements en soie à louer, plus enseignes et boîtes à cartes à garder.",
        },
      },
      {
        title: { en: "Favors & keepsakes", fr: "Cadeaux et souvenirs" },
        body: {
          en: "Keychains, mini vases, bottle stoppers, and candle molds for guests to take home after the wedding.",
          fr: "Porte-clés, mini-vases, bouchons et moules à chandelles que les invités rapportent après le mariage.",
        },
      },
    ],
    areas: [
      { en: "Montréal", fr: "Montréal" },
      { en: "Vieux-Montréal", fr: "Vieux-Montréal" },
      { en: "Plateau & Mile End", fr: "Plateau et Mile End" },
      { en: "Westmount", fr: "Westmount" },
      { en: "Outremont", fr: "Outremont" },
      { en: "West Island", fr: "Ouest-de-l'Île" },
      { en: "Laval", fr: "Laval" },
      { en: "Longueuil", fr: "Longueuil" },
      { en: "Brossard", fr: "Brossard" },
      { en: "Saint-Lambert", fr: "Saint-Lambert" },
      { en: "Boucherville", fr: "Boucherville" },
      { en: "South Shore", fr: "Rive-Sud" },
    ],
    faqs: [
      {
        q: {
          en: "Do you deliver wedding decorations outside the island?",
          fr: "Livrez-vous les décorations hors de l'île?",
        },
        a: {
          en: "Yes. Quotes include delivery and setup for venues in Montréal, Laval, Longueuil, Brossard, and the West Island.",
          fr: "Oui. La soumission inclut la livraison et l'installation pour les lieux à Montréal, Laval, Longueuil, Brossard et dans l'Ouest-de-l'Île.",
        },
      },
      {
        q: {
          en: "Can I rent a wedding arch in Montréal?",
          fr: "Puis-je louer une arche de mariage à Montréal?",
        },
        a: {
          en: "Yes. Ceremony arches, drapery, and candle holders are rentals, often with a two-week minimum so the look is held for your date.",
          fr: "Oui. Arches, voilages et bougeoirs se louent, souvent avec un minimum de deux semaines pour réserver le décor à votre date.",
        },
      },
      {
        q: {
          en: "Can I buy decorations to keep?",
          fr: "Puis-je acheter des décorations à garder?",
        },
        a: {
          en: "Yes. Welcome signs, card boxes, favors, keychains, and candle molds are purchases. There is no checkout: request a quote and we confirm the pieces.",
          fr: "Oui. Enseignes, boîtes à cartes, cadeaux, porte-clés et moules à chandelles sont en achat. Pas de paiement en ligne : demandez une soumission et nous confirmons les pièces.",
        },
      },
    ],
    tell: { en: "Tell us about your day", fr: "Parlez-nous de votre journée" },
    ctaLede: {
      en: "No payment needed now. Build a list of pieces you love and we will send a tailored quote with delivery and setup for your Greater Montréal venue.",
      fr: "Aucun paiement maintenant. Composez une liste de pièces et nous enverrons une soumission avec livraison et installation pour votre lieu du Grand Montréal.",
    },
    request: { en: "Request a quote", fr: "Demander une soumission" },
  },
  gallery: {
    kicker: { en: "Greater Montréal · Wedding decorations", fr: "Grand Montréal · Décorations de mariage" },
    title: { en: "Recent weddings", fr: "Mariages récents" },
    lede: {
      en: "Wedding décor we styled across Montréal — sunlit garden ceremonies, candlelit ballrooms, Vieux-Montréal receptions, and bridal shower decorations.",
      fr: "Décor de mariage que nous avons habillé à Montréal — cérémonies de jardin, salles de bal aux chandelles, réceptions du Vieux-Montréal et décorations de shower.",
    },
  },
  shop: {
    title: { en: "Shop & rental", fr: "Boutique et location" },
    lede: {
      en: "Rent a full wedding look for the weekend or purchase the decorations you will keep. Delivery and setup across Greater Montréal: the island, Laval, the South Shore, and the West Island.",
      fr: "Louez un décor de mariage pour le week-end ou achetez les décorations que vous garderez. Livraison et installation dans le Grand Montréal : l'île, Laval, la Rive-Sud et l'Ouest-de-l'Île.",
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
      en: "No payment needed now. Share your Greater Montréal venue and we will send a tailored wedding décor quote with delivery and setup.",
      fr: "Aucun paiement maintenant. Indiquez votre lieu du Grand Montréal et nous enverrons une soumission de décor avec livraison et installation.",
    },
    emptyCart: {
      en: "Your cart is empty —",
      fr: "Votre panier est vide —",
    },
    browse: { en: "browse the catalogue", fr: "parcourir le catalogue" },
    eventDate: { en: "Event date", fr: "Date de l'événement" },
    venue: { en: "Venue", fr: "Lieu" },
    venuePlaceholder: { en: "e.g. Château Ramezay, Laval, Brossard", fr: "ex. Château Ramezay, Laval, Brossard" },
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
