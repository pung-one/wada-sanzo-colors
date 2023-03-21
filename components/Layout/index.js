import styled from "styled-components";
import NavBar from "../Navbar";

const Header = styled.header`
  position: fixed;
  display: flex;
  justify-content: center;
  z-index: 2;
  width: 100%;
  height: 5vh;
  top: 0;
  font-size: 2.3vh;
  background-color: white;
  border-bottom: 1px solid black;
  padding: 1vh 0 1vh 0;
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
      <Header>A Dictionary of Color Combinations</Header>
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
