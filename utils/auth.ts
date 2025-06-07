"use server";

import clientPromise from "@/db/mongodb";
import { NormalizedUser, ValidIdProviders } from "@/lib/types";
import { createRemoteJWKSet, JWTPayload, jwtVerify } from "jose";
import { ObjectId } from "mongodb";

export async function createOrGetUser(
  idProvider: ValidIdProviders,
  userInfo: JWTPayload
): Promise<NormalizedUser> {
  const client = await clientPromise;
  const database = client.db("colors");
  const users = database.collection("users");

  let userEntryBySub: any;
  let userEntryByName: any;

  userEntryBySub = await users.findOne({
    sub: userInfo.sub,
  });

  //to match old user documents
  if (!userEntryBySub && idProvider === "google") {
    userEntryByName = await users.findOneAndUpdate(
      {
        user: userInfo.name,
      },
      {
        $set: {
          email: userInfo.email,
          idProvider: idProvider,
          name: userInfo.name,
          sub: userInfo.sub,
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
      idProvider: idProvider,
      favoriteColors: [],
      favoriteCombinations: [],
      createdAt: new Date(),
    };

    await users.insertOne(newUserEntry);

    userEntryBySub = { ...newUserEntry };
  }

  const userEntry = userEntryBySub ?? userEntryByName;

  return {
    userId: userEntry._id.toString(),
    name: userEntry.name,
    email: userEntry.email,
    idProvider: idProvider,
  };
}

// GOOGLE VERIFY

export async function exchangeGoogleAuthCode(code: string) {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_ID!,
      client_secret: process.env.GOOGLE_SECRET!,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI!, // Must match frontend
      grant_type: "authorization_code",
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error("Token exchange failed: " + text);
  }

  return res.json();
}

const googleJWKS = createRemoteJWKSet(
  new URL("https://www.googleapis.com/oauth2/v3/certs")
);

export async function verifyGoogleIdToken(id_token?: string) {
  const { payload } = await jwtVerify(id_token ?? "", googleJWKS, {
    issuer: "https://accounts.google.com",
    audience: process.env.GOOGLE_ID,
  });

  return payload;
}

// APPLE VERIFY
const appleJWKS = createRemoteJWKSet(
  new URL("https://appleid.apple.com/auth/keys")
);

const APPLE_AUDIENCE = [
  process.env.APPLE_WEB_ID ?? "",
  process.env.APPLE_MOBILE_ID ?? "",
].filter((a) => !!a);

export async function verifyAppleIdToken(id_token?: string) {
  const { payload } = await jwtVerify(id_token ?? "", appleJWKS, {
    issuer: "https://appleid.apple.com",
    audience: APPLE_AUDIENCE,
  });

  return payload;
}
