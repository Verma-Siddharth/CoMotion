import { NextResponse } from 'next/server';
import { verifyToken } from '../../../../lib/auth';
import { prisma } from '@repo/db';

export async function POST(req) {
  const token = req.cookies.get('token')?.value;
  const decoded = verifyToken(token);
  const { requestId } = await req.json();

  if (!decoded || decoded.role !== 'driver') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await prisma.joinRequest.update({
    where: { id: requestId },
    data: { status: 'REJECTED' },
  });

  return NextResponse.json({ message: 'Request rejected.' }, { status: 200 });
}
