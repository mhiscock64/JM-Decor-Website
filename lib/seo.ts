export const SITE_URL = "https://jm-decor-website.vercel.app";

export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
      name: "JM Decor",
      url: SITE_URL,
      image: `${SITE_URL}/images/hero.jpg`,
      logo: `${SITE_URL}/images/logo.png`,
      email: "bonjour@jmdecor.ca",
      description:
        "Wedding décor and decorations for Greater Montréal. Ceremony arches, drapery walls, candlelight, welcome signs, and favors, available to rent or purchase, with delivery and setup.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Montréal",
        addressRegion: "QC",
        addressCountry: "CA",
      },
      areaServed: [
        "Montréal",
        "Laval",
        "Longueuil",
        "Brossard",
        "Boucherville",
        "Saint-Lambert",
        "Westmount",
        "Outremont",
        "West Island",
        "South Shore",
        "Vieux-Montréal",
      ].map((name) => ({ "@type": "Place", name })),
      knowsLanguage: ["en", "fr"],
      priceRange: "$$",
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Wedding décor rental in Greater Montréal" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Wedding decoration sales" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Wedding décor delivery and setup" },
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Do you deliver wedding décor in Greater Montréal?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. JM Decor delivers and sets up wedding décor across the island of Montréal, Laval, the South Shore including Longueuil and Brossard, and the West Island.",
          },
        },
        {
          "@type": "Question",
          name: "Can I rent a wedding arch or backdrop in Montréal?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Ceremony arches, drapery walls, candle holders, and floral arrangements are available to rent. Many rentals have a two-week minimum.",
          },
        },
        {
          "@type": "Question",
          name: "Can I buy wedding decorations to keep?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Welcome signs, illuminated card boxes, favors, keychains, and candle molds can be purchased.",
          },
        },
        {
          "@type": "Question",
          name: "Is there online checkout?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Build a list and request a quote. JM Decor replies with delivery and setup for your venue. There is no payment on the site.",
          },
        },
      ],
    },
  ],
};
