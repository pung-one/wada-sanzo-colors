import {
  createOrGetUser,
  exchangeGoogleAuthCode,
  verifyAppleIdToken,
  verifyGoogleIdToken,
} from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function POST(req: NextRequest) {
  try {
    // mobile app sends id_token, web app sends auth-code
    const { idProvider, id_token, code } = await req.json();

    let tokenToVerify: string;

    if (id_token) {
      console.log("ID TOKEN: ", id_token);
      tokenToVerify = id_token;
    } else if (code && idProvider === "google") {
      const tokens = await exchangeGoogleAuthCode(code);
      tokenToVerify = tokens.id_token;
    } else {
      return NextResponse.json(
        { error: "Missing id_token or code" },
        { status: 400 }
      );
    }

    const payload =
      idProvider === "google"
        ? await verifyGoogleIdToken(tokenToVerify)
        : await verifyAppleIdToken(tokenToVerify);

    console.log("PAYLOAD: ", payload);

    const user = await createOrGetUser(idProvider, {
      sub: payload.sub,
      name: payload.name || "",
      email: payload.ememail_verified ? payload.email : "",
    });

    const sessionToken = await new SignJWT(user)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("30d")
      .sign(secret);

    const response = NextResponse.json({ user, token: sessionToken });

    response.cookies.set("token", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return response;
  } catch (err) {
    console.error("Auth failed:", err);

    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
