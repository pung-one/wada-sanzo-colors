import { useSession, signIn, signOut } from "next-auth/react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { MdInfo } from "react-icons/md";

const PageContainer = styled.main`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  padding-top: 20vh;
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
  width: 70vw;
`;

const ButtonContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 8vh 0 3vh;
`;

const StyledButton = styled.button`
  background-color: white;
  border: 1px solid black;
  padding: 5vh;
  width: 60vw;
  box-shadow: 0 0 4px black;
  margin-bottom: 5vh;
  &:hover {
    cursor: pointer;
  }
`;

const SigningOutMessage = styled.aside`
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
  transform: ${({ showSignOutMessage }) =>
    showSignOutMessage ? "scale(1)" : "scale(0)"};
  transition: all 0.3s;
`;

export default function SignIn({ setUser }) {
  const { data: session } = useSession();
  const [showSignOutMessage, setShowSignOutMessage] = useState(false);

  useEffect(() => {
    if (session) {
      setUser(session.user.name);
    }
  }, [session]);

  async function handleSignOut() {
    setShowSignOutMessage(true);
    setUser("public");
    setTimeout(() => signOut(), 1500);
  }

  return (
    <PageContainer>
      <SessionStatus>
        <InfoSymbol />
        <SessionStatusText>
          {session
            ? `You are signed in as "${session.user.name}".`
            : "You are not signed in."}
        </SessionStatusText>
      </SessionStatus>
      <Article>
        When signed in, your favorite Colors and Combinations will be stored for
        you to access them later.
        <br />
        <br />
        Whithout signing in they will only be stored in the browser.
      </Article>
      <ButtonContainer>
        {session ? (
          <>
            <StyledButton onClick={() => handleSignOut()}>
              Sign Out
            </StyledButton>
            <SigningOutMessage showSignOutMessage={showSignOutMessage}>
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
