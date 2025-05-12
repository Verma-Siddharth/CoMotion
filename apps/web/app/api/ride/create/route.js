import { NextResponse } from "next/server";
import { prisma } from "@repo/db";
import { verifyToken } from "../../../../lib/auth.js";
import { stat } from "fs";

export async function POST(req) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);

    if (!decoded || decoded.role !== "driver") {
      return NextResponse.json(
        { error: "Forbidden: Only drivers can create rides" },
        { status: 403 }
      );
    }

    const { origin, destination, departure, seats, cost } = await req.json();

    console.log("Ride creation data:", {
      origin,
      destination,
      departure,
      seats,
      cost,
    });
    if (!origin || !destination || !departure || !seats || !cost) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const existing = await prisma.ride.findFirst({
      where: {
        driverId: decoded.id,
        status: "SCHEDULED",
        departure: {
          gte: new Date(),
        },
      },
    });

    if (existing) {
      console.log("Existing ride found:", existing);
      return NextResponse.json(
        { error: "You already have an active ride." },
        { status: 400 }
      );
    }
    const ride = await prisma.ride.create({
      data: {
        driverId: decoded.id,
        origin,
        destination,
        departure: new Date(departure),
        seats: Number(seats),
        cost: Number(cost),
      },
    });

    return NextResponse.json({ message: "Ride created successfully", ride });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
