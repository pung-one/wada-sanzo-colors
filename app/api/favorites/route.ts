import clientPromise from "@/db/mongodb";
import { ObjectId } from "mongodb";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, createRemoteJWKSet } from "jose";
import { FavData, validProviders } from "@/lib/types";
import { JOSEError, JWTClaimValidationFailed, JWTExpired } from "jose/errors";

const googleJWKS = createRemoteJWKSet(
  new URL("https://www.googleapis.com/oauth2/v3/certs")
);

const appleJWKS = createRemoteJWKSet(
  new URL("https://appleid.apple.com/auth/keys")
);

async function verifyGoogleJwt(id_token?: string) {
  const { payload } = await jwtVerify(id_token ?? "", googleJWKS, {
    issuer: "https://accounts.google.com",
    audience: process.env.GOOGLE_ID,
  });

  return payload;
}

const APPLE_AUDIENCE = [
  process.env.APPLE_WEB_ID ?? "",
  process.env.APPLE_MOBILE_ID ?? "",
].filter((a) => !!a);

async function verifyAppleJwt(id_token?: string) {
  const { payload } = await jwtVerify(id_token ?? "", appleJWKS, {
    issuer: "https://appleid.apple.com",
    audience: APPLE_AUDIENCE,
  });

  return payload;
}

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
    const userId = payload.userId as string;

    const client = await clientPromise;
    const database = client.db("colors");
    const users = database.collection("users");

    const userEntry = await users.findOne({
      _id: new ObjectId(userId),
    });

    if (!userEntry) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const responseData: FavData = {
      updatedAt: userEntry.updatedAt,
      favoriteColors: userEntry.favoriteColors,
      favoriteCombinations: userEntry.favoriteCombinations,
    };

    return NextResponse.json(responseData);
  } catch (err) {
    if (err instanceof JWTExpired) {
      return NextResponse.json({ error: "Session expired." }, { status: 401 });
    }

    if (err instanceof JWTClaimValidationFailed) {
      return NextResponse.json(
        { error: "Invalid token claims" },
        { status: 403 }
      );
    }

    if (err instanceof JOSEError) {
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }

    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
}

export async function PUT(req: NextRequest) {
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
    const userId = payload.userId as string;

    const client = await clientPromise;
    const database = client.db("colors");
    const users = database.collection("users");

    const request = await req.json();

    const { type } = request;

    const fieldToUpdate =
      type === "favColorUpdate"
        ? {
            favoriteColors: request.favoriteColorsData,
            updatedAt: new Date(),
          }
        : type === "favCombinationUpdate"
        ? {
            favoriteCombinations: request.favoriteCombinationsData,
            updatedAt: new Date(),
          }
        : null;

    if (!fieldToUpdate) {
      return NextResponse.json(
        { error: "Could not process request type" },
        { status: 404 }
      );
    }

    const updatedEntry = await users.findOneAndUpdate(
      {
        _id: new ObjectId(userId),
      },
      { $set: fieldToUpdate },
      { returnDocument: "after" }
    );

    if (!updatedEntry) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json("Update successful");
  } catch (err) {
    console.error("PUT error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
