"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

import { NormalizedUser } from "../../lib/types";
import {
  OverridableTokenClientConfig,
  useGoogleLogin,
} from "@react-oauth/google";
import { useRouter } from "next/navigation";
import {
  appleAuthHelpers,
  AppleAuthResponse,
  useScript,
} from "react-apple-signin-auth";

type AuthContextType = {
  user?: NormalizedUser;
  sessionExpired: boolean;
  signInWithGoogle: (overrideConfig?: OverridableTokenClientConfig) => void;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
  handleSessionResponseError: (res: Response) => Promise<void>;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<NormalizedUser>();
  const [sessionExpired, setSessionExpired] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  async function signOut() {
    setUser(undefined);
    await fetch("/api/auth/logout", { method: "POST" });
  }

  async function handleSessionResponseError(res: Response) {
    if (res.status === 401) {
      await signOut();
      setSessionExpired(true);
      router.push("/signin");
    } else if (res.status === 403) {
      router.push("/signin");
    }
  }

  const signInWithGoogle = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      setIsLoading(true);
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

          setIsLoading(false);
          throw new Error("Failed to authenticate with Google");
        }

        const { user } = await res.json();

        setUser(user);
        setSessionExpired(false);
      } catch (err) {
        console.error("Google sign-in error:", err);
      }
      setIsLoading(false);
    },
    onError: (error) => {
      console.error("Google login popup error:", error);
      setIsLoading(false);
    },
    flow: "auth-code",
  });

  useScript(appleAuthHelpers.APPLE_SCRIPT_SRC);

  async function signInWithApple() {
    setIsLoading(true);
    await appleAuthHelpers.signIn({
      authOptions: {
        clientId: process.env.NEXT_PUBLIC_APPLE_WEB_ID!,
        scope: "email name",
        redirectURI: process.env.NEXT_PUBLIC_APPLE_REDIRECT_URI!,
        state: "state",
        nonce: "nonce",
        usePopup: true,
      },
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

          setIsLoading(false);
          throw new Error("Failed to authenticate with Google");
        }

        const { user } = await res.json();

        setUser(user);
        setSessionExpired(false);
        setIsLoading(false);
      },
      onError: (error: any) => {
        console.error("Apple login popup error:", error);
        setIsLoading(false);
      },
    });
  }

  useEffect(() => {
    async function getUser() {
      try {
        const res = await fetch("/api/auth/me");

        if (res.status === 200) {
          const userInfo = await res.json();

          if (!userInfo.userId) {
            return;
          }

          setUser(userInfo);
          setSessionExpired(false);
        } else if (res.status === 204) {
          return;
        } else {
          handleSessionResponseError(res);
        }
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
        handleSessionResponseError,
        isLoading,
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
