import styled from "styled-components";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SlArrowRight } from "react-icons/sl";
import TabBar from "../TabBar";
import CombinationsFilter from "../CombinationsFilter";
import ColorFilter from "../ColorFilter";

export default function NavBarDesktop({
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
  const [showTabBar, setShowTabBar] = useState(false);
  const router = useRouter();
  const route = router.route;
  useEffect(() => {
    setShowTabBar(true);
  }, [route]);

  return (
    <NavContainer>
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
          <NavButton
            isActive={route === "/"}
            onClick={() => {
              setShowTabBar(!showTabBar);
            }}
          >
            <Arrow $isOpen={showTabBar} $isActive={route === "/"} />
            Collection
          </NavButton>
        </Link>
        {route === "/" && showTabBar ? (
          <TabBar
            onShowColors={handleShowColors}
            onShowCombinations={handleShowCombinations}
            listType={listType}
          />
        ) : null}
        <Link href={"/favorites"} passHref legacyBehavior>
          <NavButton
            isActive={route === "/favorites"}
            onClick={() => {
              setShowTabBar(!showTabBar);
            }}
          >
            <Arrow $isOpen={showTabBar} $isActive={route === "/favorites"} />
            Favorites
          </NavButton>
        </Link>
        {route === "/favorites" && showTabBar ? (
          <TabBar
            onShowColors={handleShowColors}
            onShowCombinations={handleShowCombinations}
            listType={listType}
          />
        ) : null}
        <Link href={"/about"} passHref legacyBehavior>
          <NavButton isActive={route === "/about"}>About</NavButton>
        </Link>
      </NavPages>
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
  top: 6.5vh;
  z-index: 5;
  left: 0;
  width: 30%;
  height: 100%;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  @media screen and (max-width: 1024px), screen and (orientation: portrait) {
    display: none;
  }
`;

const NavPages = styled.nav`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const NavButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2vh;
  height: 6vh;
  width: 100%;
  border-bottom: 1px solid black;
  background-color: ${({ isActive }) => (isActive ? "black" : "white")};
  color: ${({ isActive }) => (isActive ? "white" : "black")};
  transition: all 0.1s;
  &:hover {
    cursor: pointer;
    box-shadow: inset 0 0 2px black;
  }
  &:active {
    box-shadow: inset 0 0 3px black;
  }
`;

const Arrow = styled(SlArrowRight)`
  position: absolute;
  left: 0;
  width: 10%;
  fill: ${(props) => (props.$isActive ? "white" : "black")};
  transform: ${(props) =>
    props.$isOpen && props.$isActive ? "rotate(90deg)" : ""};
  transition: transform 0.3s;
`;
