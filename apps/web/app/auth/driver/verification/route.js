// import { NextResponse } from 'next/server';

// export async function GET() {
//   const clientId = process.env.DIGILOCKER_CLIENT_ID;
//   const redirectUri = encodeURIComponent(`${process.env.NEXT_PUBLIC_BASE_URL}/api/digilocker/callback`);
//   const state = crypto.randomUUID(); // Save this in cookie/session

//   const url = `https://digilocker.meripehchaan.gov.in/public/oauth2/1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;

//   return NextResponse.redirect(url);
// }
