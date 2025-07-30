import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { JOSEError, JWTClaimValidationFailed, JWTExpired } from "jose/errors";
import clientPromise from "@/db/mongodb";
import { ObjectId } from "mongodb";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function GET(req: NextRequest) {
  const isMobile = req.headers.get("x-platform") === "mobile";
  let token;

  if (isMobile) {
    // mobile app requests
    token = req.headers.get("authorization")?.replace("Bearer ", "");
  } else {
    // web browser requests
    token = req.cookies.get("token")?.value;
  }

  if (!token) {
    console.log("NO TOKEN");
    return NextResponse.json({ userId: null }, { status: 200 });
  }

  try {
    const { payload } = await jwtVerify(token, secret);

    const { userId, name, email, idProvider } = payload;

    return NextResponse.json({ userId, name, email, idProvider });
  } catch (err) {
    if (err instanceof JWTExpired) {
      console.error("Token expired at:", err.payload.exp);
      return NextResponse.json({ error: "Session expired." }, { status: 401 });
    }

    if (err instanceof JWTClaimValidationFailed) {
      console.error("Claim validation failed:", err.claim);
      return NextResponse.json(
        { error: "Invalid token claims" },
        { status: 403 }
      );
    }

    if (err instanceof JOSEError) {
      console.error("JOSE error:", err.message);
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }

    console.error("Session validation failed:", err);
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
}

export async function DELETE(req: NextRequest) {
  const isMobile = req.headers.get("x-platform") === "mobile";
  let token;

  if (isMobile) {
    // mobile app requests
    token = req.headers.get("authorization")?.replace("Bearer ", "");
  } else {
    // web browser requests
    token = req.cookies.get("token")?.value;
  }

  if (!token) {
    console.log("NO TOKEN");
    return NextResponse.json({ error: "No token." }, { status: 404 });
  }

  try {
    const { payload } = await jwtVerify(token, secret);

    const { userId } = payload;

    const client = await clientPromise;
    const database = client.db("colors");
    const users = database.collection("users");

    await users.deleteOne({
      _id: new ObjectId(userId as string),
    });

    return NextResponse.json({ text: "User deleted." }, { status: 200 });
  } catch (err) {
    if (err instanceof JWTExpired) {
      console.error("Token expired at:", err.payload.exp);
      return NextResponse.json({ error: "Session expired." }, { status: 401 });
    }

    if (err instanceof JWTClaimValidationFailed) {
      console.error("Claim validation failed:", err.claim);
      return NextResponse.json(
        { error: "Invalid token claims" },
        { status: 403 }
      );
    }

    if (err instanceof JOSEError) {
      console.error("JOSE error:", err.message);
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }

    console.error("Session validation failed:", err);
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
}
