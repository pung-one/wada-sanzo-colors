import clientPromise from "@/db/mongodb";
import { ObjectId } from "mongodb";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, createRemoteJWKSet } from "jose";

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

async function verifyAppleJwt(id_token?: string) {
  const { payload } = await jwtVerify(id_token ?? "", appleJWKS, {
    issuer: "https://appleid.apple.com",
    audience: process.env.APPLE_ID,
  });

  return payload;
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const idProvider = searchParams.get("idProvider");

  const headersList = await headers();
  const id_token = headersList.get("Authorization")?.replace("Bearer ", "");

  let userInfo;

  if (idProvider === "google") {
    userInfo = await verifyGoogleJwt(id_token);
  }

  if (idProvider === "apple") {
    userInfo = await verifyAppleJwt(id_token);
  }

  if (!userInfo) {
    return new Response("Unauthenticated", { status: 401 });
  }

  try {
    const client = await clientPromise;
    const database = client.db("colors");
    const users = database.collection("users");

    let userEntryByEmail;
    let userEntryByName;

    userEntryByEmail = await users.findOne({
      email: userInfo.email,
    });

    if (!userEntryByEmail) {
      userEntryByName = await users.findOneAndUpdate(
        {
          user: userInfo.name,
        },
        { $set: { email: userInfo.email } },
        { returnDocument: "after" }
      );
    }

    if (!userEntryByEmail && !userEntryByName) {
      const newUserEntry = {
        _id: new ObjectId(),
        user: userInfo.name,
        email: userInfo.email,
        favoriteColors: [],
        favoriteCombinations: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await users.insertOne(newUserEntry);

      userEntryByEmail = { ...newUserEntry };
    }

    const userEntry = userEntryByEmail ?? userEntryByName;

    if (!userEntry) {
      return new Response("User not found", { status: 404 });
    }

    const { createdAt, updatedAt, ...responseData } = userEntry;

    return NextResponse.json(responseData);
  } catch (e) {
    console.error(e);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  const request = await req.json();

  const user = request.user;

  if (!user || user === "public") {
    return new Response("User not found", { status: 400 });
  }

  try {
    const client = await clientPromise;
    const database = client.db("colors");
    const favorites = database.collection("users");

    if (request.type === "favColorUpdate") {
      await favorites.updateOne(
        { user: user },
        {
          $set: {
            favoriteColors: request.favoriteColorsData,
            updatedAt: new Date(),
          },
        },
        { upsert: true }
      );
    } else if (request.type === "favCombinationUpdate") {
      await favorites.updateOne(
        { user: user },
        {
          $set: {
            favoriteCombinations: request.favoriteCombinationsData,
            updatedAt: new Date(),
          },
        },
        { upsert: true }
      );
    } else {
      return new Response("Internal Server Error", { status: 500 });
    }

    return new Response("Favorite status updated.", {
      status: 200,
    });
  } catch (e) {
    console.error(e);
    return new Response("Internal Server Error", { status: 500 });
  }
}
