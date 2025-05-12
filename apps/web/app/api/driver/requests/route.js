import { NextResponse } from 'next/server';
import { verifyToken } from '../../../../lib/auth';
import { prisma } from '@repo/db';

export async function GET(req) {
  const token = req.cookies.get('token')?.value;
  const decoded = verifyToken(token);

  if (!decoded || decoded.role !== 'driver') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const requests = await prisma.joinRequest.findMany({
    where: {
      ride: {
        driverId: decoded.id,
      },
      status: 'PENDING',
    },
    include: {
      ride: true,
      user: {
        select: { name: true, email: true },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return NextResponse.json({ requests }, { status: 200 });
}
