import { NextResponse } from 'next/server';
import { verifyToken } from '../../../../lib/auth';
import { prisma } from '@repo/db';

export async function GET(req) {
  const token = req.cookies.get('token')?.value;
  const decoded = verifyToken(token);

  if (!decoded || decoded.role !== 'driver') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const rides = await prisma.ride.findMany({
    where: { driverId: decoded.id },
    orderBy: { departure: 'desc' },
  });

  return NextResponse.json({ rides }, { status: 200 });
}
