import styled from "styled-components";
import Link from "next/link";

const StyledFooter = styled.nav`
  position: fixed;
  display: flex;
  justify-content: space-around;
  align-items: center;
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
`;

export default function Layout({ children, setInspirationPageFilter }) {
  return (
    <>
      {children}
      <StyledFooter>
        <StyledLink
          href={"/inspiration"}
          onClick={() => setInspirationPageFilter("initialPage")}
        >
          Inspiration
        </StyledLink>
        <StyledLink href={"/"}>Lists</StyledLink>
        <StyledLink href={"/bookmarks"}>Bookmarks</StyledLink>
      </StyledFooter>
    </>
  );
}
