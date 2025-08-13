// Vercel Serverless Function: /api/zeroping-ingest  (alias provided at /api/zeroping/ingest)
// Minimal ingest endpoint (no auth). In-memory store per instance.
function getStore() {
  if (!globalThis.__ZP_STORE) {
    globalThis.__ZP_STORE = { calls: [], createdAt: new Date().toISOString() };
  }
  return globalThis.__ZP_STORE;
}

module.exports = async (req, res) => {
  const store = getStore();

  if (req.method === "POST") {
    try {
      const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
      const item = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
        receivedAt: new Date().toISOString(),
        ...body,
      };
      store.calls.unshift(item);
      if (store.calls.length > 500) store.calls.length = 500;
      return res.status(200).json({ ok: true, stored: true, id: item.id, count: store.calls.length });
    } catch (err) {
      return res.status(400).json({ ok: false, error: "Invalid JSON body", detail: String(err) });
    }
  }

  if (req.method === "GET") {
    return res.status(200).json({ ok: true, endpoint: "zeroping-ingest", stored: getStore().calls.length });
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ ok: false, error: "Method Not Allowed" });
};
