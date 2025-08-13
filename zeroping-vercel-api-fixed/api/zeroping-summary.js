// Vercel Serverless Function: /api/zeroping-summary  (alias at /api/zeroping/summary)
function getStore() {
  if (!globalThis.__ZP_STORE) {
    globalThis.__ZP_STORE = { calls: [], createdAt: new Date().toISOString() };
  }
  return globalThis.__ZP_STORE;
}
module.exports = async (req, res) => {
  const store = getStore();
  const last24h = store.calls.filter(x => {
    const t = new Date(x.timeISO || x.receivedAt || 0).getTime();
    return Date.now() - t < 24 * 60 * 60 * 1000;
  }).length;

  return res.status(200).json({
    ok: true,
    createdAt: store.createdAt,
    total: store.calls.length,
    last24h,
  });
};
