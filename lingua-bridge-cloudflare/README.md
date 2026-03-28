# Lingua Bridge — Cloudflare Workers

Translation API powered by `google-translate-api-x` and [Hono](https://hono.dev/), deployed on Cloudflare Workers.

**Free tier: 100,000 requests/day — no cold starts, no spin-down.**

---

## Project Structure

```
src/
├── index.ts                      # Worker entry point (Hono app)
├── controllers/
│   └── translateController.ts    # Translation logic
└── routes/
    └── translateRoutes.ts        # Route definitions
wrangler.toml                     # Cloudflare Workers config
```

---

## API

### `POST /api/translate`

**Request body:**
```json
{
  "text": "Hello world",
  "target": "es"
}
```

**Response:**
```json
{
  "success": true,
  "translatedText": "Hola mundo",
  "sourceLang": "en"
}
```

`target` defaults to `"en"` if not provided. Uses ISO 639-1 language codes.

### `GET /health`
Returns `{ "status": "API is running" }`.

---

## Local Development

```bash
npm install
npm run dev
# → http://localhost:8787
```

For local environment variables, create a `.dev.vars` file:
```
FRONTEND_ORIGIN=http://localhost:3000
```

---

## Deploy to Cloudflare

### 1. Login
```bash
npx wrangler login
```

### 2. Deploy
```bash
npm run deploy
```

Your worker will be live at:
`https://lingua-bridge.<your-subdomain>.workers.dev`

### 3. Set CORS origin (optional)
In **Cloudflare Dashboard → Workers → lingua-bridge → Settings → Variables**, add:
```
FRONTEND_ORIGIN = https://your-frontend.com
```

---

## CORS

- Defaults to `*` (all origins allowed) if `FRONTEND_ORIGIN` is not set.
- Set `FRONTEND_ORIGIN` to a comma-separated list for multiple origins:
  `https://app.com,https://staging.app.com`
