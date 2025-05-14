import { NextResponse } from 'next/server';

export async function POST() {
  

  // Expire the cookie
  response.cookies.set('token', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    expires: new Date(0), // expired immediately
  });

  return NextResponse.json({ message: 'Logged out' }, { status: 200 });
}
