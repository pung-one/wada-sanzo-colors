"use client";

import styled from "styled-components";
import { useEffect, useState } from "react";
import { MdInfo } from "react-icons/md";
import { useAuth } from "../auth/AuthProvider";
import { LoadingOverlay } from "../LoadingOverlay/LoadingOverlay";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { PiSignOut } from "react-icons/pi";
import { AppStoreLink } from "../AppStoreLink/AppStoreLink";

export function SignIn() {
  const [showSignOutMessage, setShowSignOutMessage] = useState(false);

  const {
    user,
    sessionExpired,
    signInWithGoogle,
    signInWithApple,
    signOut,
    isLoading,
  } = useAuth();

  async function handleSignOut() {
    setShowSignOutMessage(true);
    await signOut();
    setShowSignOutMessage(false);
  }

  function getInfoText() {
    if (sessionExpired) {
      return <p>Your session expired. Please login again.</p>;
    } else if (user?.name) {
      return <p>{`You are signed in as "${user.name}".`}</p>;
    } else if (user?.email) {
      return <p>{`You are signed in as "${user.email}".`}</p>;
    } else if (user && user.idProvider) {
      return (
        <p>{`You are signed in with ${
          user.idProvider === "google" ? "Google" : "Apple"
        }.`}</p>
      );
    } else {
      return <p>Your are not signed in.</p>;
    }
  }

  return (
    <PageContainer>
      <LoadingOverlay visible={isLoading} />

      <SessionStatus key={user?.name || ""}>
        <InfoSymbol />

        {getInfoText()}
      </SessionStatus>

      <ButtonContainer>
        {user ? (
          <>
            <StyledButton onClick={() => handleSignOut()}>
              <span>Sign Out</span> <PiSignOut />
            </StyledButton>

            <SigningOutMessage $showSignOutMessage={showSignOutMessage}>
              Signing out...
            </SigningOutMessage>
          </>
        ) : (
          <>
            <StyledButton onClick={() => signInWithGoogle()}>
              <FcGoogle /> <span>Sign in with Google</span>
            </StyledButton>

            <StyledButton onClick={() => signInWithApple()}>
              <FaApple /> <span>Sign in with Apple</span>
            </StyledButton>
          </>
        )}
      </ButtonContainer>

      <Article>
        You can find your favorite Colors and Combinations under "Favorites".
        <br />
        <br />
        After signing in, your favorites will be saved to your account so you
        can access them anytime, on any device via the website or on your phone
        via the{" "}
        <a href="" target="_blank">
          iOS App
        </a>
        . Without signing in, favorites are only stored in your browser.
        <br />
        <br />
        <AppStoreLink />
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
          Google or Apple. These cookies are essential for authentication and
          are <b>not</b> used for tracking. Your name, email, and login provider
          are stored securely in a database to manage your account.
        </PrivacyInfo>
      </Article>
    </PageContainer>
  );
}

const PageContainer = styled.main`
  position: relative;
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
  * {
    font-size: 14px;
  }
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
  display: flex;
  gap: 8;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border: 1px solid black;
  height: 48px;
  width: 220px;
  padding: 0 12px;
  box-shadow: 0 0 4px black;
  &:hover {
    cursor: pointer;
    box-shadow: none;
  }
  span {
    flex: 1;
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
