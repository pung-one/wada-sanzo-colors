import styled from "styled-components";
import Link from "next/link";

const StyledFooter = styled.footer`
  position: fixed;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1;
  bottom: 0;
  width: 100%;
  height: 11vh;
  background-color: white;
  padding: 2vh;
  border-top: 1px solid black;
`;

const StyledLink = styled(Link)`
  border: 1px solid black;
  width: 28vw;
  padding: 2vh;
  color: black;
`;

export default function Layout({ children }) {
  return (
    <>
      {children}
      <StyledFooter>
        <StyledLink href={"/inspiration"}>Inspiration</StyledLink>
        <StyledLink href={"/"}>Lists</StyledLink>
      </StyledFooter>
    </>
  );
}
