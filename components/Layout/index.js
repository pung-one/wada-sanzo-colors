import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { MdKeyboardArrowDown } from "react-icons/md";

const Header = styled.header`
  position: fixed;
  display: flex;
  justify-content: center;
  z-index: 1;
  width: 100%;
  height: 5vh;
  top: 0%;
  font-size: 2.3vh;
  background-color: white;
  border-bottom: 1px solid black;
  padding: 1vh 0 1vh 0;
`;

const NavBar = styled.nav`
  position: fixed;
  display: flex;
  justify-content: space-around;
  align-items: center;
  top: 5vh;
  width: 100%;
  height: 7vh;
  background-color: white;
  border-bottom: 1px solid black;
`;

const NavButton = styled.div`
  border: 1px solid black;
  box-shadow: ${({ isActive }) => (isActive ? "" : "0 0 2px black")};
  padding: 1vh 2vw 1vh;
  font-size: 2vh;
  text-align: center;
  transition: box-shadow 0.1s;
`;

const StyledArrowDown = styled(MdKeyboardArrowDown)``;

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
      <NavBar>
        <Link href={"/inspiration"}>
          <NavButton
            isActive={
              route === "/inspiration" &&
              inspirationPageFilter === "initialPage"
            }
            onClick={() => setInspirationPageFilter("initialPage")}
          >
            Inspiration
            {route === "/inspiration" && <StyledArrowDown />}
          </NavButton>
        </Link>
        <Link href={"/"}>
          <NavButton isActive={route === "/"}>
            Lists
            {route === "/" && <StyledArrowDown />}
          </NavButton>
        </Link>
        <Link href={"/bookmarks"}>
          <NavButton isActive={route === "/bookmarks"}>
            Bookmarks
            {route === "/bookmarks" && <StyledArrowDown />}
          </NavButton>
        </Link>
        <Link href={"/about"}>
          <NavButton isActive={route === "/about"}>
            About
            {route === "/about" && <StyledArrowDown />}
          </NavButton>
        </Link>
      </NavBar>
    </>
  );
}
