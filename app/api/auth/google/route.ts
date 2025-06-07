import { createOrGetUser, exchangeGoogleAuthCode } from "@/utils/auth";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

const googleJWKS = createRemoteJWKSet(
  new URL("https://www.googleapis.com/oauth2/v3/certs")
);

async function verifyGoogleIdToken(id_token?: string) {
  const { payload } = await jwtVerify(id_token ?? "", googleJWKS, {
    issuer: "https://accounts.google.com",
    audience: process.env.GOOGLE_ID,
  });

  return payload;
}

export async function POST(req: NextRequest) {
  try {
    // mobile app sends id_token, web app sends auth-code
    const { id_token, code } = await req.json();

    let tokenToVerify: string;

    if (id_token) {
      tokenToVerify = id_token;
    } else if (code) {
      const tokens = await exchangeGoogleAuthCode(code);
      tokenToVerify = tokens.id_token;
    } else {
      return NextResponse.json(
        { error: "Missing id_token or code" },
        { status: 400 }
      );
    }

    console.log("CODE: ", code);
    console.log("TOKEN: ", tokenToVerify);

    const payload = await verifyGoogleIdToken(tokenToVerify);

    console.log("PAYLOAD: ", payload);

    const user = await createOrGetUser("google", {
      sub: payload.sub,
      name: payload.name,
      email: payload.email,
    });

    const sessionToken = await new SignJWT(user)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("30d")
      .sign(secret);

    console.log("SESSION TOKEN: ", sessionToken);

    if (code) {
      // web app: set cookie

      const response = NextResponse.json({ user });

      response.cookies.set("token", sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });

      return response;
    } else if (id_token) {
      // mobile app: send token

      return NextResponse.json({ user, token: sessionToken });
    } else {
      return NextResponse.json(
        { error: "Authentication failed" },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("Google auth failed:", err);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
