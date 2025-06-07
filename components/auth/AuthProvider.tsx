"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

import { NormalizedUser } from "../../lib/types";
import {
  OverridableTokenClientConfig,
  useGoogleLogin,
} from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { appleAuthHelpers, AppleAuthResponse } from "react-apple-signin-auth";

type AuthContextType = {
  user?: NormalizedUser;
  sessionExpired: boolean;
  signInWithGoogle: (overrideConfig?: OverridableTokenClientConfig) => void;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
  handleSessionResponse: (res: Response) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<NormalizedUser>();
  const [sessionExpired, setSessionExpired] = useState<boolean>(false);

  const router = useRouter();

  async function signOut() {
    setUser(undefined);
    await fetch("/api/auth/logout", { method: "POST" });
  }

  async function handleSessionResponse(res: Response) {
    if (res.ok) {
      const userInfo = await res.json();
      setUser(userInfo);
      setSessionExpired(false);
    } else if (res.status === 401) {
      await signOut();
      setSessionExpired(true);
      router.push("/signin");
    } else if (res.status === 403) {
      router.push("/signin");
    }
  }

  const signInWithGoogle = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const res = await fetch("/api/auth/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idProvider: "google",
            code: codeResponse.code,
          }),
        });

        if (!res.ok) {
          const errorText = await res.text();
          console.error("Google auth failed:", errorText);

          throw new Error("Failed to authenticate with Google");
        }

        const { user } = await res.json();

        setUser(user);
        setSessionExpired(false);
      } catch (err) {
        console.error("Google sign-in error:", err);
      }
    },
    onError: (error) => {
      console.error("Google login popup error:", error);
    },
    flow: "auth-code",
  });

  async function signInWithApple() {
    appleAuthHelpers.signIn({
      authOptions: {
        /** Client ID - eg: 'com.example.com' */
        clientId: process.env.APPLE_WEB_ID!,
        /** Requested scopes, seperated by spaces - eg: 'email name' */
        scope: "email name",
        /** Apple's redirectURI - must be one of the URIs you added to the serviceID - the undocumented trick in apple docs is that you should call auth from a page that is listed as a redirectURI, localhost fails */
        redirectURI: process.env.APPLE_REDIRECT_URI!,
        /** State string that is returned with the apple response */
        state: "state",
        /** Nonce */
        nonce: "nonce",
        /** Uses popup auth instead of redirection */
        usePopup: true,
      }, // REQUIRED
      onSuccess: async (response: AppleAuthResponse) => {
        const res = await fetch("/api/auth/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idProvider: "apple",
            id_token: response.authorization.id_token,
          }),
        });

        if (!res.ok) {
          const errorText = await res.text();
          console.error("Apple auth failed:", errorText);

          throw new Error("Failed to authenticate with Google");
        }

        const { user } = await res.json();

        setUser(user);
        setSessionExpired(false);
      },
      onError: (error: any) => console.error(error),
    });
  }

  useEffect(() => {
    async function getUser() {
      try {
        const res = await fetch("/api/auth/me");

        handleSessionResponse(res);
      } catch (e) {
        console.error(e);
      }
    }

    if (!user) {
      getUser();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        sessionExpired,
        signInWithGoogle,
        signInWithApple,
        signOut,
        handleSessionResponse,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
