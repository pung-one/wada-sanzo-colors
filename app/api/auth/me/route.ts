import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { headers } from "next/headers";
import { JOSEError, JWTClaimValidationFailed, JWTExpired } from "jose/errors";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function GET(req: NextRequest) {
  // Check token from cookie (web)
  const cookieToken = req.cookies.get("token")?.value;

  // Check Authorization header (React Native)
  const headersList = await headers();
  const bearerToken = headersList.get("Authorization")?.replace("Bearer ", "");

  const token = cookieToken || bearerToken;

  if (!token) {
    return NextResponse.json({ error: "No session token." }, { status: 404 });
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
