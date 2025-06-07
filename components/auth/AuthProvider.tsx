"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

import { NormalizedUser } from "../../lib/types";
import {
  OverridableTokenClientConfig,
  useGoogleLogin,
} from "@react-oauth/google";

type AuthContextType = {
  idProvider?: "google" | "apple";
  user?: NormalizedUser;
  signInWithGoogle: (overrideConfig?: OverridableTokenClientConfig) => void;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<NormalizedUser>();
  const [idProvider, setIdProvider] = useState<"google" | "apple">();

  async function signOut() {}

  const signInWithGoogle = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const res = await fetch("/api/auth/google", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code: codeResponse.code }),
        });

        if (!res.ok) {
          const errorText = await res.text();
          console.error("Google auth failed:", errorText);

          throw new Error("Failed to authenticate with Google");
        }

        const { user } = await res.json();

        setUser(user);
        setIdProvider("google");

        console.log("Successfully signed in with Google:", user);
      } catch (err) {
        console.error("Google sign-in error:", err);
      }
    },
    onError: (error) => {
      console.error("Google login popup error:", error);
    },
    flow: "auth-code",
  });

  async function signInWithApple() {}

  useEffect(() => {
    console.log("USER: ", user);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        idProvider,
        user,
        signInWithGoogle,
        signInWithApple,
        signOut,
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
