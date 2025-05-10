// /app/api/auth/me/route.js
import { NextResponse } from 'next/server';
import { verifyToken } from '../../../../lib/auth';

export async function GET(req) {
  const token = req.cookies.get('token')?.value;
  const decoded = verifyToken(token);

  if (!decoded) {
    return NextResponse.json({ role: null });
  }

  return NextResponse.json({ role: decoded.role });
}
