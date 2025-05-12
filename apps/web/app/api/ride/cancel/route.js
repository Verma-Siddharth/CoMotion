import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db.js';
import { verifyToken } from '@/lib/auth.js';

export async function POST(req) {
  const token = req.cookies.get('token')?.value;
  const decoded = verifyToken(token);
  const { rideId } = await req.json();

  if (!decoded || decoded.role !== 'driver') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await prisma.ride.update({
    where: { id: rideId, driverId: decoded.id },
    data: { status: 'CANCELLED' },
  });

  return NextResponse.json({ message: 'Ride ended.' });
}
