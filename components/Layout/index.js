import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import TabBar from "../TabBar";
import PalettesFilter from "../PalettesFilter";
import ColorFilter from "../ColorFilter";

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
  height: 9vh;
  background-color: white;
  border-bottom: 1px solid black;
`;

const NavButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  box-shadow: ${({ isActive }) => (isActive ? "" : "0 0 2px black")};
  background-color: ${({ isActive }) => (isActive ? "black" : "white")};
  color: ${({ isActive }) => (isActive ? "white" : "black")};
  padding: 1vh 2vw 1vh;
  font-size: 2vh;
  width: 22.5vw;
  height: 6vh;
  text-align: center;
  transition: box-shadow 0.1s;
  &:hover {
    cursor: pointer;
  }
`;

export default function Layout({
  children,
  inspirationPageFilter,
  setInspirationPageFilter,
  handleShowColors,
  handleShowPalettes,
  listType,
  paletteListType,
  handleShowPalettesWith2Colors,
  handleShowPalettesWith3Colors,
  handleShowPalettesWith4Colors,
  favoritePalettesData,
  colorListType,
  handleShowSwatchOne,
  handleShowSwatchTwo,
  handleShowSwatchThree,
  handleShowSwatchFour,
  handleShowSwatchFive,
  handleShowSwatchSix,
  favoriteColorsData,
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
          </NavButton>
        </Link>
        <Link href={"/"}>
          <NavButton isActive={route === "/"}>Lists</NavButton>
        </Link>
        <Link href={"/bookmarks"}>
          <NavButton isActive={route === "/bookmarks"}>Bookmarks</NavButton>
        </Link>
        <Link href={"/about"}>
          <NavButton isActive={route === "/about"}>About</NavButton>
        </Link>
      </NavBar>
      {route === "/" || route === "/bookmarks" ? (
        <TabBar
          onShowColors={handleShowColors}
          onShowPalettes={handleShowPalettes}
          listType={listType}
        />
      ) : null}
      {(listType === "colors" && route === "/") ||
      (listType === "colors" && route === "/bookmarks") ? (
        <ColorFilter
          colorListType={colorListType}
          handleShowSwatchOne={handleShowSwatchOne}
          handleShowSwatchTwo={handleShowSwatchTwo}
          handleShowSwatchThree={handleShowSwatchThree}
          handleShowSwatchFour={handleShowSwatchFour}
          handleShowSwatchFive={handleShowSwatchFive}
          handleShowSwatchSix={handleShowSwatchSix}
          favoriteColorsData={favoriteColorsData}
          isAtBookmarks={route === "/bookmarks"}
        />
      ) : null}
      {(listType === "palettes" && route === "/") ||
      (listType === "palettes" && route === "/bookmarks") ? (
        <PalettesFilter
          paletteListType={paletteListType}
          onShowPalettesWith2Colors={handleShowPalettesWith2Colors}
          onShowPalettesWith3Colors={handleShowPalettesWith3Colors}
          onShowPalettesWith4Colors={handleShowPalettesWith4Colors}
          favoritePalettesData={favoritePalettesData}
          isAtBookmarks={route === "/bookmarks"}
        />
      ) : null}
    </>
  );
}
