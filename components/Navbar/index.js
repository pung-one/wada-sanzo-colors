import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import TabBar from "../TabBar";
import PalettesFilter from "../PalettesFilter";
import ColorFilter from "../ColorFilter";

const NavContainer = styled.div`
  position: ${({ isOnList }) => (isOnList ? "sticky" : "fixed")};
  top: ${({ show }) => (!show ? "-23vh" : "5vh")};
  z-index: 1;
  width: 100%;
  transition: top 0.5s;
`;

const NavPages = styled.nav`
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
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

export default function NavBar({
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
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  function handleScroll() {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    }
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [lastScrollY]);

  return (
    <NavContainer
      show={show}
      isOnList={route === "/" || route === "/favorites"}
    >
      <NavPages>
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
        <Link href={"/favorites"}>
          <NavButton isActive={route === "/favorites"}>Favorites</NavButton>
        </Link>
        <Link href={"/about"}>
          <NavButton isActive={route === "/about"}>About</NavButton>
        </Link>
      </NavPages>
      {route === "/" || route === "/favorites" ? (
        <TabBar
          onShowColors={handleShowColors}
          onShowPalettes={handleShowPalettes}
          listType={listType}
        />
      ) : null}
      {(listType === "colors" && route === "/") ||
      (listType === "colors" && route === "/favorites") ? (
        <ColorFilter
          colorListType={colorListType}
          handleShowSwatchOne={handleShowSwatchOne}
          handleShowSwatchTwo={handleShowSwatchTwo}
          handleShowSwatchThree={handleShowSwatchThree}
          handleShowSwatchFour={handleShowSwatchFour}
          handleShowSwatchFive={handleShowSwatchFive}
          handleShowSwatchSix={handleShowSwatchSix}
          favoriteColorsData={favoriteColorsData}
          isAtFavorites={route === "/favorites"}
        />
      ) : null}
      {(listType === "palettes" && route === "/") ||
      (listType === "palettes" && route === "/favorites") ? (
        <PalettesFilter
          paletteListType={paletteListType}
          onShowPalettesWith2Colors={handleShowPalettesWith2Colors}
          onShowPalettesWith3Colors={handleShowPalettesWith3Colors}
          onShowPalettesWith4Colors={handleShowPalettesWith4Colors}
          favoritePalettesData={favoritePalettesData}
          isAtFavorites={route === "/favorites"}
        />
      ) : null}
    </NavContainer>
  );
}
