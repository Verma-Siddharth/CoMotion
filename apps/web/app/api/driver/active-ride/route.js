import { NextResponse } from 'next/server';
import { prisma } from '@repo/db';
import { verifyToken } from '../../../../lib/auth';

export async function GET(req) {
  const token = req.cookies.get('token')?.value;
  const decoded = verifyToken(token);

  if (!decoded || decoded.role !== 'driver') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const ride = await prisma.ride.findFirst({
    where: {
      driverId: decoded.id,
      departure: {
        gt: new Date(),
      },
    },
    orderBy: {
      departure: 'asc',
    },
  });

  return NextResponse.json({ ride }, { status: 200 });
}
