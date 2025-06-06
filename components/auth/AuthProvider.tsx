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
  idToken?: string;
  signInWithGoogle: (overrideConfig?: OverridableTokenClientConfig) => void;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<NormalizedUser>();
  const [idToken, setIdToken] = useState<string>();
  const [idProvider, setIdProvider] = useState<"google" | "apple">();

  async function signOut() {}

  const signInWithGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
    flow: "auth-code",
  });

  async function signInWithApple() {}

  useEffect(() => {}, []);

  return (
    <AuthContext.Provider
      value={{
        idProvider,
        user,
        idToken,
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
