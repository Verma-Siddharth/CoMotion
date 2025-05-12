import { NextResponse } from "next/server";
import { verifyToken } from "../../../../lib/auth";
import { prisma } from "@repo/db";
import axios from "axios";

export async function POST(req) {
  try {
    const token = req.cookies.get("token")?.value;
    const decoded = verifyToken(token);
    const { joinRequestId } = await req.json();

    if (!decoded || decoded.role !== "driver") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!joinRequestId) {
      return NextResponse.json({ error: "Missing requestId" }, { status: 400 });
    }

    const joinRequest = await prisma.joinRequest.findUnique({
      where: { id: joinRequestId },
      include: {
        ride: true,
      },
    });

    if (!joinRequest) {
      return NextResponse.json(
        { error: "Join request not found" },
        { status: 404 }
      );
    }

    const ride = joinRequest.ride;

    if (ride.driverId !== decoded.id) {
      return NextResponse.json(
        { error: "You do not own this ride" },
        { status: 403 }
      );
    }

    await prisma.joinRequest.update({
      where: { id: joinRequestId },
      data: { status: "REJECTED" },
    });

    console.log("Join Request: ", joinRequest);
    
    const response = await axios.post("http://localhost:4000/emit-rejection", {
      userId: joinRequest.userId,
      rideId: joinRequest.rideId,
    });

    return NextResponse.json({ message: "Join Request rejected." }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
