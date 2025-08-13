# ZeroPing Vercel API (No Framework)

This is the **simplest possible** Vercel deploy to receive messages from your Telegram scraper.

## Endpoints

- `POST /api/zeroping-ingest` → store a message (JSON body). Also `GET` returns a small status.
- `GET  /api/zeroping-calls?limit=100` → fetch recent ingested items (in-memory).
- `GET  /api/zeroping-summary` → tiny summary.

> Storage is **in-memory per Lambda instance** (good for quick tests). For persistence, swap to a DB or Redis later.

## Deploy (GitHub → Vercel)

1. Create a new GitHub repo and add the files in this ZIP.
2. Import the repo into Vercel.
3. After deploy, your URLs will be like:
   - `https://<project>.vercel.app/api/zeroping-ingest`
   - `https://<project>.vercel.app/api/zeroping-calls`
   - `https://<project>.vercel.app/api/zeroping-summary`

## Test

```bash
# health check
curl https://<project>.vercel.app/api/zeroping-ingest

# send a test message
curl -X POST https://<project>.vercel.app/api/zeroping-ingest   -H "Content-Type: application/json"   -d '{"timeISO":"2025-08-13T00:00:00Z","channel":"@ZeroPingX","messageId":1,"rawText":"hello world"}'

# fetch recent
curl https://<project>.vercel.app/api/zeroping-calls?limit=5
```

## Scraper settings

Use this as your `INGEST_URL` in the scraper:

```
https://<project>.vercel.app/api/zeroping-ingest
```

No auth is enforced in this starter. Add a header check once you're ready.
