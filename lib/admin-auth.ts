export const ADMIN_COOKIE = 'jstores_admin';

const encoder = new TextEncoder();

function base64Url(input: Uint8Array | string) {
  const bytes = typeof input === 'string' ? encoder.encode(input) : input;
  let binary = '';
  bytes.forEach(byte => { binary += String.fromCharCode(byte); });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function signature(payload: string, secret: string) {
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return base64Url(new Uint8Array(await crypto.subtle.sign('HMAC', key, encoder.encode(payload))));
}

export async function createAdminSession(email: string) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error('ADMIN_SESSION_SECRET is not configured');
  const payload = base64Url(JSON.stringify({ email, exp: Date.now() + 8 * 60 * 60 * 1000 }));
  return `${payload}.${await signature(payload, secret)}`;
}

export async function verifyAdminSession(value?: string) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!value || !secret) return false;
  const [payload, supplied] = value.split('.');
  if (!payload || !supplied || supplied !== await signature(payload, secret)) return false;
  try {
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const data = JSON.parse(atob(normalized)) as { email: string; exp: number };
    return data.email === process.env.ADMIN_EMAIL && data.exp > Date.now();
  } catch { return false; }
}
