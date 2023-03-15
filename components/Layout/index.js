import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = styled.header`
  position: fixed;
  display: flex;
  justify-content: center;
  z-index: 1;
  width: 100%;
  top: 0%;
  font-size: 2.3vh;
  background-color: white;
  border-bottom: 1px solid black;
  padding: 1vh 0 1vh 0;
`;

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

const NavButton = styled.span`
  border: 1px solid black;
  box-shadow: ${({ isActive }) => (isActive ? "" : "0 2px 5px grey")};
  width: 28vw;
  padding: 2vh;
`;

export default function Layout({
  children,
  inspirationPageFilter,
  setInspirationPageFilter,
}) {
  const router = useRouter();
  const route = router.route;

  return (
    <>
      <Header>A Dictionary of Color Combinations</Header>
      {children}
      <StyledFooter>
        <Link href={"/inspiration"}>
          <NavButton
            isActive={
              route === "/inspiration" &&
              inspirationPageFilter === "initialPage"
            }
            onClick={() => setInspirationPageFilter("initialPage")}
          >
            Inspiration
          </NavButton>
        </Link>
        <Link href={"/"}>
          <NavButton isActive={route === "/"}>Lists</NavButton>
        </Link>
        <Link href={"/bookmarks"}>
          <NavButton isActive={route === "/bookmarks"}>Bookmarks</NavButton>
        </Link>
      </StyledFooter>
    </>
  );
}
