import styled from "styled-components";
import NavBar from "../Navbar";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Layout({
  children,
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
    <>
      <Header>
        A Dictionary of Color Combinations
        <Link href={"/signin"} passHref legacyBehavior>
          <SignInOutButton isActive={route === "/signin"}>
            Sign In/Out
          </SignInOutButton>
        </Link>
      </Header>
      <NavBar
        inspirationPageFilter={inspirationPageFilter}
        setInspirationPageFilter={setInspirationPageFilter}
        handleShowColors={handleShowColors}
        handleShowCombinations={handleShowCombinations}
        listType={listType}
        combinationListType={combinationListType}
        handleShowCombinationsWith2Colors={handleShowCombinationsWith2Colors}
        handleShowCombinationsWith3Colors={handleShowCombinationsWith3Colors}
        handleShowCombinationsWith4Colors={handleShowCombinationsWith4Colors}
        favoriteCombinationsData={favoriteCombinationsData}
        colorListType={colorListType}
        handleShowSwatchOne={handleShowSwatchOne}
        handleShowSwatchTwo={handleShowSwatchTwo}
        handleShowSwatchThree={handleShowSwatchThree}
        handleShowSwatchFour={handleShowSwatchFour}
        handleShowSwatchFive={handleShowSwatchFive}
        handleShowSwatchSix={handleShowSwatchSix}
        favoriteColorsData={favoriteColorsData}
      />
      {children}
    </>
  );
}

const Header = styled.header`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 6;
  width: 100%;
  height: 6.5vh;
  top: 0;
  font-size: 2vh;
  font-weight: lighter;
  background-color: white;
  border-bottom: 1px solid black;
  padding: 1vh 0 1vh 3vw;
`;

const SignInOutButton = styled.a`
  display: flex;
  align-items: center;
  margin-right: 2vw;
  height: 4.5vh;
  font-size: 1.8vh;
  font-weight: normal;
  padding: 0 1.5vw 0 1.5vw;
  background-color: ${({ isActive }) => (isActive ? "black" : "white")};
  color: ${({ isActive }) => (isActive ? "white" : "black")};
  border: 1px solid black;
  box-shadow: ${({ isActive }) => (isActive ? "" : "0 0 2px black")};
  transition: all 0.2s;
  &:hover {
    cursor: pointer;
  }
`;
