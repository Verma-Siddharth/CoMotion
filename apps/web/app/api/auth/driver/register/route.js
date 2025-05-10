import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@repo/db';

export async function POST(req) {
  try {
    const { name, email, password, phoneNumber, licenseNumber, vehicleInfo } = await req.json();

    if (!name || !email || !password || !phoneNumber || !licenseNumber || !vehicleInfo) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const existingDriver = await prisma.driver.findUnique({ where: { email } });

    if (existingDriver) {
      return NextResponse.json({ error: 'Driver already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const driver = await prisma.driver.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        licenseNumber,
        vehicleInfo,
        isVerified: false, // Default unverified
      },
    });

    return NextResponse.json({ message: 'Driver registered successfully!' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
