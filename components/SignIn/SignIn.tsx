"use client";

import styled from "styled-components";
import { useState } from "react";
import { MdInfo } from "react-icons/md";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { useAuth } from "../auth/AuthProvider";

export function SignIn() {
  const [showSignOutMessage, setShowSignOutMessage] = useState(false);

  const { signInWithGoogle } = useAuth();

  async function handleSignOut() {
    /* setShowSignOutMessage(true);
    setTimeout(() => signOut(), 1500); */
  }

  const session: { idProvider?: string } = { idProvider: undefined };

  return (
    <PageContainer>
      <SessionStatus>
        <InfoSymbol />
        <p>
          {session
            ? `You are signed in with ${
                session?.idProvider === "google" ? "Google" : "Apple"
              }.`
            : "You are not signed in."}
        </p>
      </SessionStatus>

      <ButtonContainer>
        <>
          <StyledButton onClick={() => handleSignOut()}>Sign Out</StyledButton>
          <SigningOutMessage $showSignOutMessage={showSignOutMessage}>
            Signing out...
          </SigningOutMessage>
        </>
        <>
          <StyledButton onClick={() => signInWithGoogle()}>
            Sign in with Google
          </StyledButton>

          <StyledButton onClick={() => {}}>Sign in with Apple</StyledButton>
          <StyledButton
            onClick={() => {
              googleLogout();
            }}
          >
            Sign out
          </StyledButton>
        </>
      </ButtonContainer>

      <Article>
        After signing in, your favorite Colors and Combinations will be stored
        for you to access them later.
        <br />
        <br />
        Whithout signing in, they will only be stored in the browser.
        <br />
        <br />
        (This service is free, but i appreciate a{" "}
        <a
          href="https://www.paypal.com/donate/?hosted_button_id=PAFRAKM2HQWVY"
          target="_blank"
        >
          donation
        </a>{" "}
        for maintenance and development.)
        <br />
        <br />
        <PrivacyInfo>
          Cookies are used to manage your login session after signing in with
          Google or Apple. These are essential for authentication and not used
          for tracking. Also your name, email, and login provider is stored in a
          database to manage your account.
        </PrivacyInfo>
      </Article>
    </PageContainer>
  );
}

const PageContainer = styled.main`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  padding: 150px 0 100px;
  @media screen and (min-width: 1024px), screen and (orientation: landscape) {
    width: 70%;
    margin-left: 30%;
  }
`;

const SessionStatus = styled.span`
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid black;
  padding: 20px;
  margin-bottom: 50px;
`;

const InfoSymbol = styled(MdInfo)`
  font-size: 2rem;
`;

const Article = styled.article`
  position: relative;
  max-width: 400px;
  margin: 50px auto;
  padding: 0 20px;
  text-align: left;
  a {
    text-decoration: underline;
  }
`;

const PrivacyInfo = styled.p`
  font-size: 14px;
`;

const ButtonContainer = styled.div`
  position: relative;
  display: flex;
  gap: 30px;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const StyledButton = styled.button`
  background-color: white;
  border: 1px solid black;
  padding: 20px;
  box-shadow: 0 0 4px black;
  &:hover {
    cursor: pointer;
    box-shadow: none;
  }
`;

const SigningOutMessage = styled.aside<{ $showSignOutMessage: boolean }>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 11;
  padding: 20px 30px;
  background-color: white;
  border: 1px solid black;
  overflow: hidden;
  transform: ${({ $showSignOutMessage }) =>
    $showSignOutMessage ? "scale(1)" : "scale(0)"};
  transition: all 0.3s;
`;
