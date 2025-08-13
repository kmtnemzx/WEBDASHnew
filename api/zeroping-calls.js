// Vercel Serverless Function: /api/zeroping-calls
// Returns the last N ingested items (in-memory).

function getStore() {
  if (!globalThis.__ZP_STORE) {
    globalThis.__ZP_STORE = { calls: [], createdAt: new Date().toISOString() };
  }
  return globalThis.__ZP_STORE;
}

module.exports = async (req, res) => {
  const store = getStore();
  const limit = Math.min(parseInt(req.query.limit || "100", 10) || 100, 500);
  const data = store.calls.slice(0, limit);
  return res.status(200).json({ ok: true, count: data.length, createdAt: store.createdAt, items: data });
};
