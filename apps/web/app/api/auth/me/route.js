// /app/api/auth/me/route.js
import { NextResponse } from 'next/server';
import { verifyToken } from '../../../../lib/auth';

export async function GET(req) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'No token' }, { status: 401 });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
  }

  return NextResponse.json({ id: decoded.id, role: decoded.role }, { status: 200 });
}
