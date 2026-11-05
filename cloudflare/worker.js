// Cloudflare Worker: keeps your OpenRouteService key private.
// 1) Create a NEW key at openrouteservice.org (the old one was public in your page).
// 2) Add it as a secret named ORS_KEY (Workers > Settings > Variables and Secrets).
// 3) Your calculator then POSTs {coordinates:[[lon,lat],[lon,lat]]} to this Worker's URL.
const ALLOWED = "https://profitpilotlogistics.com";
export default {
  async fetch(req, env) {
    const cors = {"Access-Control-Allow-Origin": ALLOWED, "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type"};
    if (req.method === "OPTIONS") return new Response(null, {headers: cors});
    if (req.method !== "POST" || req.headers.get("Origin") !== ALLOWED) return new Response("Forbidden", {status: 403, headers: cors});
    let body;
    try { body = await req.json(); } catch { return new Response("Bad request", {status: 400, headers: cors}); }
    const c = body.coordinates;
    if (!Array.isArray(c) || c.length !== 2) return new Response("Bad request", {status: 400, headers: cors});
    const r = await fetch("https://api.heigit.org/openrouteservice/v2/directions/driving-hgv", {
      method: "POST",
      headers: {"Content-Type": "application/json", Authorization: env.ORS_KEY},
      body: JSON.stringify({coordinates: c})
    });
    return new Response(r.body, {status: r.status, headers: {...cors, "Content-Type": "application/json"}});
  }
};
