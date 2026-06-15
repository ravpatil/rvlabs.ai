import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { password } = body || {};
    const adminPass = process.env.ADMIN_PASSWORD;
    const jwtSecret = process.env.ADMIN_JWT_SECRET || process.env.ADMIN_PASSWORD || 'devsecret';

    if (!adminPass) {
      return new Response(JSON.stringify({ error: 'Admin password not configured on server' }), { status: 500 });
    }

    if (password !== adminPass) {
      return new Response(JSON.stringify({ error: 'Invalid password' }), { status: 401 });
    }

    const token = jwt.sign({ role: 'admin' }, jwtSecret, { expiresIn: '6h' });

    const res = NextResponse.json({ ok: true });
    res.cookies.set({ name: 'rvlabs_admin', value: token, httpOnly: true, path: '/', sameSite: 'lax', secure: process.env.NODE_ENV === 'production' });
    return res;
  } catch (err: any) {
    console.error('Admin login error', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}
