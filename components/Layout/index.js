import styled from "styled-components";
import NavBar from "../Navbar";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const Header = styled.header`
  position: fixed;
  display: flex;
  align-items: center;
  z-index: 2;
  width: 100%;
  height: 5.5vh;
  top: 0;
  font-size: 2vh;
  background-color: white;
  border-bottom: 1px solid black;
  padding: 1vh 0 1vh 3vw;
`;

const SignInOutButton = styled(Link)`
  position: absolute;
  display: flex;
  align-items: center;
  right: 2vw;
  height: 3vh;
  font-size: 1.8vh;
  padding: 0 1vw 0 1vw;
  background-color: white;
  border: 1px solid black;
  box-shadow: 0 0 2px black;
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
  return (
    <>
      <Header>
        A Dictionary of Color Combinations
        <SignInOutButton href={"/signin"}>Sign In/Out</SignInOutButton>
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
