import styled from "styled-components";
import Link from "next/link";
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
  const router = useRouter();
  const route = router.route;

  return (
    <NavContainer isOnList={route === "/" || route === "/favorites"}>
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
          <NavButton isActive={route === "/"}>
            <Arrow isActive={route === "/"} />
            Collection
          </NavButton>
        </Link>
        {route === "/" && (
          <TabBar
            onShowColors={handleShowColors}
            onShowCombinations={handleShowCombinations}
            listType={listType}
            isInDesktopMode={true}
            route={route}
            colorListType={colorListType}
            handleShowSwatchOne={handleShowSwatchOne}
            handleShowSwatchTwo={handleShowSwatchTwo}
            handleShowSwatchThree={handleShowSwatchThree}
            handleShowSwatchFour={handleShowSwatchFour}
            handleShowSwatchFive={handleShowSwatchFive}
            handleShowSwatchSix={handleShowSwatchSix}
            favoriteColorsData={favoriteColorsData}
            isAtFavorites={false}
          />
        )}
        <Link href={"/favorites"} passHref legacyBehavior>
          <NavButton isActive={route === "/favorites"}>
            <Arrow isActive={route === "/favorites"} />
            Favorites
          </NavButton>
        </Link>
        {route === "/favorites" && (
          <TabBar
            onShowColors={handleShowColors}
            onShowCombinations={handleShowCombinations}
            listType={listType}
            isInDesktopMode={true}
            route={route}
            colorListType={colorListType}
            handleShowSwatchOne={handleShowSwatchOne}
            handleShowSwatchTwo={handleShowSwatchTwo}
            handleShowSwatchThree={handleShowSwatchThree}
            handleShowSwatchFour={handleShowSwatchFour}
            handleShowSwatchFive={handleShowSwatchFive}
            handleShowSwatchSix={handleShowSwatchSix}
            favoriteColorsData={favoriteColorsData}
            isAtFavorites={true}
          />
        )}
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
  width: 38.2vw;
  height: 100vh;
  border-right: 1px solid black;
`;

const NavPages = styled.nav`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  background-color: white;
`;

const NavButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1vh 2vw 1vh;
  font-size: 2vh;
  height: 6vh;
  width: 100%;
  text-align: center;
  /*  background-color: ${({ isActive }) => (isActive ? "black" : "white")};
  color: ${({ isActive }) => (isActive ? "white" : "black")}; */
  border-bottom: 1px solid black;
  &:hover {
    cursor: pointer;
  }
`;

const Arrow = styled(SlArrowRight)`
  position: absolute;
  left: 0;
  width: 10%;
  /*  fill: ${({ isActive }) => (isActive ? "white" : "black")}; */
  transform: ${({ isActive }) => (isActive ? "rotate(90deg)" : "")};
  transition: transform 0.2s;
`;
