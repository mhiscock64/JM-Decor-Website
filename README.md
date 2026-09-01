# JM Decor

A recreation of the [Montréal wedding décor site](https://montreal-wedding-dream.lovable.app/): a bilingual studio for arches, candlelight, drapery, and rental pieces.

Browse past weddings, add catalogue items to a quote cart, then send a request with venue details. No payment is collected.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:43123](http://localhost:43123).

```bash
npm run build
npm start
```

## What you can do

- Home, gallery, shop, and quote pages matching the original layout and copy
- English / French toggle (saved in the browser)
- Rental and purchase catalogue with a persistent cart
- Image lightbox on gallery and product photos
- Quote form with a simple math spam check

Quote requests are validated on the server and logged. There is no inbox integration in this recreation; connect an email provider if you want live delivery.

Optional: set `CAPTCHA_SECRET` in `.env.local` for production spam-check tokens.
