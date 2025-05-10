import { NextResponse } from 'next/server';
import { prisma } from '@repo/db';
import { verifyToken } from '../../../../lib/auth';

export async function POST(req) {
  try {
    const token = req.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyToken(token);

    if (!decoded || decoded.role !== 'driver') {
      return NextResponse.json({ error: 'Forbidden: Only drivers can approve requests' }, { status: 403 });
    }

    const { joinRequestId } = await req.json();

    if (!joinRequestId) {
      return NextResponse.json({ error: 'Missing joinRequestId' }, { status: 400 });
    }

    const joinRequest = await prisma.joinRequest.findUnique({
      where: { id: joinRequestId },
      include: {
        ride: true,
      },
    });

    if (!joinRequest) {
      return NextResponse.json({ error: 'Join request not found' }, { status: 404 });
    }

    const ride = joinRequest.ride;

    if (ride.driverId !== decoded.id) {
      return NextResponse.json({ error: 'You do not own this ride' }, { status: 403 });
    }

    if (ride.seats < 1) {
      return NextResponse.json({ error: 'No seats available' }, { status: 400 });
    }

    // Approve the request
    await prisma.joinRequest.update({
      where: { id: joinRequestId },
      data: { status: 'APPROVED' },
    });

    // Decrease ride seats
    await prisma.ride.update({
      where: { id: ride.id },
      data: { seats: ride.seats - 1 },
    });

    return NextResponse.json({ message: 'Join request approved' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
