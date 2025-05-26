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

  if (!id_token || !idProvider) {
    return new Response("Missing credentials", { status: 400 });
  }

  let userInfo;

  try {
    userInfo =
      idProvider === "google"
        ? await verifyGoogleJwt(id_token)
        : idProvider === "apple"
        ? await verifyAppleJwt(id_token)
        : null;
  } catch {
    return new Response("Invalid token", { status: 401 });
  }

  if (!userInfo?.sub) {
    return new Response("Unauthenticated", { status: 401 });
  }

  console.log(userInfo);

  try {
    const client = await clientPromise;
    const database = client.db("colors");
    const users = database.collection("users");

    let userEntryBySub;
    let userEntryByName;

    userEntryBySub = await users.findOne({
      sub: userInfo.sub,
    });

    if (!userEntryBySub) {
      userEntryByName = await users.findOneAndUpdate(
        {
          user: userInfo.name,
        },
        {
          $set: {
            email: userInfo.email,
            idProvider: idProvider as string,
            name: userInfo.name,
            sub: userInfo.sub,
            updatedAt: new Date(),
          },
        },
        { returnDocument: "after" }
      );
    }

    if (!userEntryBySub && !userEntryByName) {
      const newUserEntry = {
        _id: new ObjectId(),
        name: userInfo.name,
        email: userInfo.email,
        sub: userInfo.sub,
        idProvider: idProvider as string,
        favoriteColors: [],
        favoriteCombinations: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await users.insertOne(newUserEntry);

      userEntryBySub = { ...newUserEntry };
    }

    const userEntry = userEntryBySub ?? userEntryByName;

    if (!userEntry) {
      return new Response("User not found", { status: 404 });
    }

    const responseData = { ...userEntry };
    delete responseData.createdAt;
    delete responseData.updatedAt;
    delete responseData.sub;
    delete responseData.idProvider;

    return NextResponse.json(responseData);
  } catch (e) {
    console.error(e);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  const request = await req.json();

  const { idProvider, type } = request;

  const headersList = await headers();
  const id_token = headersList.get("Authorization")?.replace("Bearer ", "");

  if (!id_token || !idProvider) {
    return new Response("Missing credentials", { status: 400 });
  }

  let userInfo;

  try {
    userInfo =
      idProvider === "google"
        ? await verifyGoogleJwt(id_token)
        : idProvider === "apple"
        ? await verifyAppleJwt(id_token)
        : null;
  } catch {
    return new Response("Invalid token", { status: 401 });
  }

  if (!userInfo?.sub) {
    return new Response("Unauthenticated", { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("colors");
    const users = db.collection("users");

    const fieldToUpdate =
      request.type === "favColorUpdate"
        ? {
            favoriteColors: request.favoriteColorsData,
            updatedAt: new Date(),
          }
        : request.type === "favCombinationUpdate"
        ? {
            favoriteCombinations: request.favoriteCombinationsData,
            updatedAt: new Date(),
          }
        : null;

    if (!fieldToUpdate) {
      return new Response("Could not process request type", { status: 404 });
    }

    let updatedEntryBySub;
    let updatedEntryByName;

    updatedEntryBySub = await users.findOneAndUpdate(
      {
        sub: userInfo.sub,
      },
      { $set: fieldToUpdate },
      { returnDocument: "after" }
    );

    if (!updatedEntryBySub) {
      updatedEntryByName = await users.findOneAndUpdate(
        {
          user: userInfo.name,
        },
        { $set: fieldToUpdate },
        { returnDocument: "after" }
      );
    }

    if (!updatedEntryBySub && !updatedEntryByName) {
      return new Response("User not found", { status: 404 });
    }

    return new Response("Update successful", { status: 200 });
  } catch (err) {
    console.error("PUT error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
