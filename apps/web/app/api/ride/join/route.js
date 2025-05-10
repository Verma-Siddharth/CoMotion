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

    if (!decoded || decoded.role !== 'user') {
      return NextResponse.json({ error: 'Forbidden: Only users can join rides' }, { status: 403 });
    }

    const { rideId } = await req.json();

    if (!rideId) {
      return NextResponse.json({ error: 'Missing rideId' }, { status: 400 });
    }

    const ride = await prisma.ride.findUnique({
      where: { id: rideId },
    });

    if (!ride) {
      return NextResponse.json({ error: 'Ride not found' }, { status: 404 });
    }

    // Optional: check if the user already requested this ride
    const existingRequest = await prisma.joinRequest.findFirst({
      where: {
        rideId,
        userId: decoded.id,
      },
    });

    if (existingRequest) {
      return NextResponse.json({ error: 'Already requested this ride' }, { status: 409 });
    }

    const joinRequest = await prisma.joinRequest.create({
      data: {
        rideId,
        userId: decoded.id,
        status: 'PENDING',
      },
    });

    return NextResponse.json({ message: 'Join request sent', joinRequest });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
