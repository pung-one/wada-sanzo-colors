import clientPromise from "@/db/mongodb";
import { ObjectId } from "mongodb";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { FavData } from "@/lib/types";
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
    console.log("NO TOKEN");
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
      console.log("NO USER ENTRY");
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
    console.log("NO TOKEN");
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
      console.log("NO USER ENTRY");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json("Update successful");
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

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
