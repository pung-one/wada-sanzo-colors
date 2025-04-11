import { useSession, signIn, signOut } from "next-auth/react";
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { MdInfo } from "react-icons/md";
import { ActionContext } from "@/lib/actionsContext";

export default function SignIn() {
  const { data: session } = useSession();
  const [showSignOutMessage, setShowSignOutMessage] = useState(false);

  const actionContext = useContext(ActionContext);

  useEffect(() => {
    if (session && actionContext) {
      actionContext.setUser(session.user?.name || "public");
    }
    console.log(session);
  }, [session]);

  async function handleSignOut() {
    setShowSignOutMessage(true);
    actionContext?.setUser("public");
    setTimeout(() => signOut(), 1500);
  }

  return (
    <PageContainer>
      <SessionStatus>
        <InfoSymbol />
        <SessionStatusText>
          {session
            ? `You are signed in as "${session?.user?.name}".`
            : "You are not signed in."}
        </SessionStatusText>
      </SessionStatus>
      <Article>
        When signed in, your favorite Colors and Combinations will be stored for
        you to access them later.
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
                signIn("github");
              }}
            >
              Sign in with Github
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
  padding-top: 20vh;
  @media screen and (min-width: 1024px), screen and (orientation: landscape) {
    width: 70%;
    margin-left: 30%;
  }
`;

const SessionStatus = styled.span`
  display: flex;
  align-items: center;
  gap: 2vw;
  border: 1px solid black;
  padding: 2vw;
`;

const InfoSymbol = styled(MdInfo)`
  font-size: 4vh;
`;

const SessionStatusText = styled.p`
  font-size: 2.5vh;
`;

const Article = styled.article`
  position: relative;
  padding-top: 5vh;
  width: 80%;
  a {
    text-decoration: underline;
  }
`;

const ButtonContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 8vh 0 3vh;
`;

const StyledButton = styled.button`
  background-color: white;
  border: 1px solid black;
  padding: 5vh;
  width: 60%;
  box-shadow: 0 0 4px black;
  margin-bottom: 5vh;
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
  width: 50vw;
  height: 8vh;
  font-size: 2.5vh;
  z-index: 11;
  background-color: white;
  border: 1px solid black;
  overflow: hidden;
  transform: ${({ $showSignOutMessage }) =>
    $showSignOutMessage ? "scale(1)" : "scale(0)"};
  transition: all 0.3s;
`;
