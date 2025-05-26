"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import styled from "styled-components";
import { useState } from "react";
import { MdInfo } from "react-icons/md";

export function SignIn() {
  const { data: session } = useSession();
  const [showSignOutMessage, setShowSignOutMessage] = useState(false);

  async function handleSignOut() {
    setShowSignOutMessage(true);
    setTimeout(() => signOut(), 1500);
  }

  return (
    <PageContainer>
      <SessionStatus>
        <InfoSymbol />
        <p>
          {session
            ? `You are signed in with "${
                session?.idProvider === "google" ? "Google" : "Apple"
              }".`
            : "You are not signed in."}
        </p>
      </SessionStatus>

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
          for tracking. Also your name, email, and login provider is stored in
          our database to manage your account.
        </PrivacyInfo>
      </Article>

      <ButtonContainer>
        {session ? (
          <>
            <StyledButton onClick={() => handleSignOut()}>
              Sign Out
            </StyledButton>
            <SigningOutMessage $showSignOutMessage={showSignOutMessage}>
              Signing out...
            </SigningOutMessage>
          </>
        ) : (
          <>
            <StyledButton
              onClick={() => {
                signIn("google");
              }}
            >
              Sign in with Google
            </StyledButton>

            <StyledButton
              onClick={() => {
                signIn("apple");
              }}
            >
              Sign in with Apple
            </StyledButton>
          </>
        )}
      </ButtonContainer>
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
  padding: 30px;
  width: 60%;
  box-shadow: 0 0 4px black;
  &:hover {
    cursor: pointer;
    box-shadow: none;
  }
`;

const SigningOutMessage = styled.aside<{ $showSignOutMessage: boolean }>`
  position: relative;
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
