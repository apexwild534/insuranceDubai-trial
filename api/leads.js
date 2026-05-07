/**
 * /api/leads.js — Vercel Serverless Proxy
 *
 * Receives lead POSTs from the frontend and forwards
 * them to the Google Apps Script Web App.
 *
 * The Apps Script URL never touches the frontend —
 * it lives only in Vercel's environment variables.
 *
 * Setup:
 *   Vercel Dashboard → Project → Settings → Environment Variables
 *   Add: APPS_SCRIPT_URL = <your Web App URL from google-apps-script.gs>
 */

// FIX 1: Explicitly configure Vercel's body parser with a size limit.
// Without this export, req.body can silently be undefined on some Vercel versions.
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '64kb',
    },
  },
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const url = process.env.APPS_SCRIPT_URL;
  if (!url) {
    console.error('APPS_SCRIPT_URL is not set in environment variables');
    return res.status(500).json({ ok: false, error: 'Server misconfiguration' });
  }

  // FIX 2: Safely coerce body — Vercel's bodyParser gives us an object,
  // but guard against it being a raw string or missing entirely.
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ ok: false, error: 'Invalid request body' });
  }

  if (!body.name  || !String(body.name).trim())  return res.status(400).json({ ok: false, error: 'name is required' });
  if (!body.phone || !String(body.phone).trim())  return res.status(400).json({ ok: false, error: 'phone is required' });
  if (!body.insurance_type)                        return res.status(400).json({ ok: false, error: 'insurance_type is required' });

  const payload = {
    name:           String(body.name).trim(),
    email:          String(body.email          || '').trim(),
    phone:          String(body.phone).trim(),
    age:            String(body.age            || ''),
    insurance_type: String(body.insurance_type),
    message:        String(body.message        || '').trim(),
    source_page:    String(body.source_page    || req.headers.referer || ''),
    source_widget:  String(body.source_widget  || ''),
    submitted_at:   new Date().toISOString()
  };

  try {
    const gsRes = await fetch(url, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload)
    });

    // FIX 3: Apps Script sometimes returns an HTML error page instead of JSON
    // (e.g. when the deployment is stale or auth fails). Safely handle that.
    const rawText = await gsRes.text();
    let gsData;
    try {
      gsData = JSON.parse(rawText);
    } catch {
      console.error('Apps Script returned non-JSON response:', rawText.slice(0, 300));
      return res.status(502).json({ ok: false, error: 'Upstream returned invalid response' });
    }

    if (gsData.ok) {
      return res.status(200).json({ ok: true });
    } else {
      console.error('Apps Script error:', gsData.error);
      return res.status(502).json({ ok: false, error: 'Upstream error' });
    }
  } catch (err) {
    console.error('Fetch to Apps Script failed:', err.message);
    return res.status(502).json({ ok: false, error: 'Could not reach storage' });
  }
}
