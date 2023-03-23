import styled from "styled-components";
import NavBar from "../Navbar";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";

const Header = styled.header`
  position: fixed;
  display: flex;
  align-items: center;
  z-index: 2;
  width: 100%;
  height: 5vh;
  top: 0;
  font-size: 2vh;
  background-color: white;
  border-bottom: 1px solid black;
  padding: 1vh 0 1vh 3vw;
`;

const SignInOutButton = styled.button`
  position: absolute;
  right: 2vw;
  height: 3vh;
  font-size: 1.8vh;
  padding: 0 1vw 0 1vw;
  background-color: white;
  border: 1px solid black;
  &:hover {
    cursor: pointer;
  }
`;

export default function Layout({
  children,
  user,
  setUser,
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
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      setUser(session.user.name);
    }
  }, [session]);

  return (
    <>
      <Header>
        A Dictionary of Color Combinations
        {session && (
          <SignInOutButton
            onClick={() => {
              signOut();
              setUser("public");
            }}
          >
            Sign Out
          </SignInOutButton>
        )}
        {!session && (
          <SignInOutButton onClick={() => signIn()}>Sign In</SignInOutButton>
        )}
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
