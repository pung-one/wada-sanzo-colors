import styled from "styled-components";
import NavBar from "../Navbar";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = styled.header`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 2;
  width: 100%;
  height: 5.5vh;
  top: 0;
  font-size: 2vh;
  font-weight: lighter;
  background-color: white;
  border-bottom: 1px solid black;
  padding: 1vh 0 1vh 3vw;
`;

const SignInOutButton = styled.div`
  display: flex;
  align-items: center;
  margin-right: 2vw;
  height: 3vh;
  font-size: 1.8vh;
  font-weight: normal;
  padding: 0 1vw 0 1vw;
  background-color: ${({ isActive }) => (isActive ? "black" : "white")};
  color: ${({ isActive }) => (isActive ? "white" : "black")};
  border: 1px solid black;
  box-shadow: ${({ isActive }) => (isActive ? "" : "0 0 2px black")};
  transition: all 0.2s;
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
      <Header>
        A Dictionary of Color Combinations
        <Link href={"/signin"}>
          <SignInOutButton isActive={route === "/signin"}>
            Sign In/Out
          </SignInOutButton>
        </Link>
      </Header>
      <NavBar
        inspirationPageFilter={inspirationPageFilter}
        setInspirationPageFilter={setInspirationPageFilter}
        handleShowColors={handleShowColors}
        handleShowPalettes={handleShowPalettes}
        listType={listType}
        paletteListType={paletteListType}
        handleShowPalettesWith2Colors={handleShowPalettesWith2Colors}
        handleShowPalettesWith3Colors={handleShowPalettesWith3Colors}
        handleShowPalettesWith4Colors={handleShowPalettesWith4Colors}
        favoritePalettesData={favoritePalettesData}
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
