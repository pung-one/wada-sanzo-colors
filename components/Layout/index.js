import styled from "styled-components";
import NavBar from "../Navbar";
import NavBarDesktop from "../NavBarDesktop";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
  const [viewportWidth, setViewportWidth] = useState("");
  const [viewportHeight, setViewportHeight] = useState("");
  const router = useRouter();
  const route = router.route;

  function handleResize() {
    setViewportWidth(window.innerWidth);
    setViewportHeight(window.innerHeight);
  }

  useEffect(() => {
    if (typeof window !== undefined) {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

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
      {viewportWidth < 1024 && viewportHeight > viewportWidth ? (
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
      ) : (
        <NavBarDesktop
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
      )}
      {children}
      <DonationButton
        href="https://www.paypal.com/donate/?hosted_button_id=PAFRAKM2HQWVY"
        target="_blank"
      >
        Donate
      </DonationButton>
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
    box-shadow: none;
  }
`;

const DonationButton = styled.a`
  z-index: 999;
  position: fixed;
  bottom: 10px;
  left: 10px;
  font-size: 1.8vh;
  font-weight: normal;
  padding: 10px;
  background-color: white;
  color: black;
  border: 1px solid black;
  box-shadow: ${({ isActive }) => (isActive ? "" : "0 0 2px black")};
  transition: all 0.2s;
  &:hover {
    cursor: pointer;
    box-shadow: none;
  }
`;
