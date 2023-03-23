import { useSession, signIn } from "next-auth/react";
import styled from "styled-components";

const PageContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20vh;
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

const Article = styled.article`
  width: 70vw;
  padding-bottom: 7vh;
`;

export default function SignIn() {
  const { data: session } = useSession();

  return (
    <PageContainer>
      {session ? (
        <h1>You are signed in.</h1>
      ) : (
        <>
          <Article>
            When signed in, your favorite Colors and Combinations will be stored
            for you to access them later.
            <br />
            <br />
            Whithout signing in they will only be stored in the browser.
          </Article>
          <StyledButton onClick={() => signIn("google")}>
            Sign in with Google
          </StyledButton>
          <StyledButton onClick={() => signIn("github")}>
            Sign in with Github
          </StyledButton>
        </>
      )}
    </PageContainer>
  );
}
