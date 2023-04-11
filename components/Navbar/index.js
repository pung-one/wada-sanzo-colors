import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import TabBar from "../TabBar";
import CombinationsFilter from "../CombinationsFilter";
import ColorFilter from "../ColorFilter";

export default function NavBar({
  inspirationPageFilter,
  setInspirationPageFilter,
  handleShowColors,
  handleShowCombinations,
  listType,
  combinationListType,
  handleShowCombinationsWith2Colors,
  handleShowCombinationsWith3Colors,
  handleShowCombinationsWith4Colors,
  favoriteCombinationsData,
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
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
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
        <Link href={"/inspiration"} passHref legacyBehavior>
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
        <Link href={"/"} passHref legacyBehavior>
          <NavButton isActive={route === "/"}>Collection</NavButton>
        </Link>
        <Link href={"/favorites"} passHref legacyBehavior>
          <NavButton isActive={route === "/favorites"}>Favorites</NavButton>
        </Link>
        <Link href={"/about"} passHref legacyBehavior>
          <NavButton isActive={route === "/about"}>About</NavButton>
        </Link>
      </NavPages>
      {route === "/" || route === "/favorites" ? (
        <TabBar
          onShowColors={handleShowColors}
          onShowCombinations={handleShowCombinations}
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
      {(listType === "combinations" && route === "/") ||
      (listType === "combinations" && route === "/favorites") ? (
        <CombinationsFilter
          combinationListType={combinationListType}
          onShowCombinationsWith2Colors={handleShowCombinationsWith2Colors}
          onShowCombinationsWith3Colors={handleShowCombinationsWith3Colors}
          onShowCombinationsWith4Colors={handleShowCombinationsWith4Colors}
          favoriteCombinationsData={favoriteCombinationsData}
          isAtFavorites={route === "/favorites"}
        />
      ) : null}
    </NavContainer>
  );
}

const NavContainer = styled.div`
  position: fixed;
  z-index: 5;
  top: ${({ show }) => (!show ? "-30vh" : "6.5vh")};
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

const NavButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  box-shadow: ${({ isActive }) => (isActive ? "" : "0 0 2px black")};
  background-color: ${({ isActive }) => (isActive ? "black" : "white")};
  color: ${({ isActive }) => (isActive ? "white" : "black")};
  padding: 1vh 2vw 1vh;
  font-size: 2vh;
  height: 6vh;
  width: 22.5%;
  text-align: center;
  &:hover {
    cursor: pointer;
  }
`;
