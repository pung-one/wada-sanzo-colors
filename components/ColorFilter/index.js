import { css } from "styled-components";
import styled from "styled-components";
import { useState, useEffect } from "react";

const FilterContainer = styled.nav`
  position: fixed;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  top: 20vh;
  width: 100%;
  height: 12vh;
  padding: 1vh 0 1vh;
  background-color: white;
  border-bottom: 1px solid black;
`;

const StyledButton = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 1px solid black;
  height: 4vh;
  width: 30vw;
  overflow: hidden;
  box-shadow: ${({ isActive }) => (isActive ? null : "0 0 2px black")};
  transition: box-shadow 0.1s;
  &:hover {
    cursor: pointer;
  }
  ${(props) =>
    props.swatch === "red/purple"
      ? css`
          background: linear-gradient(
            90deg,
            rgba(249, 193, 206, 1) 10%,
            rgba(203, 47, 67, 1) 50%,
            rgba(100, 45, 94, 1) 90%
          );
        `
      : props.swatch === "yellow/red"
      ? css`
          background: linear-gradient(
            90deg,
            rgba(255, 242, 0, 1) 10%,
            rgba(217, 102, 41, 1) 50%,
            rgba(107, 113, 64, 1) 90%
          );
        `
      : props.swatch === "yellow/green"
      ? css`
          background: linear-gradient(
            90deg,
            rgba(199, 209, 79, 1) 10%,
            rgba(0, 180, 155, 1) 50%,
            rgba(26, 116, 68, 1) 90%
          );
        `
      : props.swatch === "blue/turquoise"
      ? css`
          background: linear-gradient(
            90deg,
            rgba(188, 228, 229, 1) 10%,
            rgba(98, 198, 191, 1) 50%,
            rgba(18, 53, 78, 1) 90%
          );
        `
      : props.swatch === "blue/purple"
      ? css`
          background: linear-gradient(
            90deg,
            rgba(181, 177, 216, 1) 10%,
            rgba(100, 80, 161, 1) 50%,
            rgba(80, 19, 69, 1) 90%
          );
        `
      : props.swatch === "white/grey/black"
      ? css`
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 1) 10%,
            rgba(162, 176, 173, 1) 50%,
            rgba(17, 19, 20, 1) 90%
          );
        `
      : null}
  background: ${({ isActive }) => (isActive ? "black" : "")};
`;

const SwatchName = styled.span`
  color: white;
  visibility: ${({ isActive }) => (isActive ? "visible" : "hidden")};
`;

const StyledNumber = styled.span`
  position: absolute;
  right: 1vw;
  bottom: 0.5vh;
  font-size: 1.5vh;
  color: white;
`;

export default function ColorFilter({
  colorListType,
  handleShowSwatchOne,
  handleShowSwatchTwo,
  handleShowSwatchThree,
  handleShowSwatchFour,
  handleShowSwatchFive,
  handleShowSwatchSix,
  favoriteColorsData,
  isAtBookmarks,
}) {
  const [favsSwatchOne, setFavsSwatchOne] = useState(0);
  const [favsSwatchTwo, setFavsSwatchTwo] = useState(0);
  const [favsSwatchThree, setFavsSwatchThree] = useState(0);
  const [favsSwatchFour, setFavsSwatchFour] = useState(0);
  const [favsSwatchFive, setFavsSwatchFive] = useState(0);
  const [favsSwatchSix, setFavsSwatchSix] = useState(0);

  useEffect(() => {
    setFavsSwatchOne(
      favoriteColorsData.filter(
        (color) => color.swatch === 0 && color.isFavorite
      ).length
    );
    setFavsSwatchTwo(
      favoriteColorsData.filter(
        (color) => color.swatch === 1 && color.isFavorite
      ).length
    );
    setFavsSwatchThree(
      favoriteColorsData.filter(
        (color) => color.swatch === 2 && color.isFavorite
      ).length
    );
    setFavsSwatchFour(
      favoriteColorsData.filter(
        (color) => color.swatch === 3 && color.isFavorite
      ).length
    );
    setFavsSwatchFive(
      favoriteColorsData.filter(
        (color) => color.swatch === 4 && color.isFavorite
      ).length
    );
    setFavsSwatchSix(
      favoriteColorsData.filter(
        (color) => color.swatch === 5 && color.isFavorite
      ).length
    );
  }, [favoriteColorsData]);
  return (
    <FilterContainer>
      <StyledButton
        onClick={() => handleShowSwatchOne()}
        isActive={colorListType === 1}
        swatch={"red/purple"}
      >
        <SwatchName isActive={colorListType === 1}>red/purple</SwatchName>
        {isAtBookmarks && <StyledNumber>{favsSwatchOne}</StyledNumber>}
      </StyledButton>
      <StyledButton
        onClick={() => handleShowSwatchTwo()}
        isActive={colorListType === 2}
        swatch={"yellow/red"}
      >
        <SwatchName isActive={colorListType === 2}>yellow/red</SwatchName>
        {isAtBookmarks && <StyledNumber>{favsSwatchTwo}</StyledNumber>}
      </StyledButton>
      <StyledButton
        onClick={() => handleShowSwatchThree()}
        isActive={colorListType === 3}
        swatch={"yellow/green"}
      >
        <SwatchName isActive={colorListType === 3}>yellow/green</SwatchName>
        {isAtBookmarks && <StyledNumber>{favsSwatchThree}</StyledNumber>}
      </StyledButton>
      <StyledButton
        onClick={() => handleShowSwatchFour()}
        isActive={colorListType === 4}
        swatch={"blue/turquoise"}
      >
        <SwatchName isActive={colorListType === 4}>blue/turquoise</SwatchName>
        {isAtBookmarks && <StyledNumber>{favsSwatchFour}</StyledNumber>}
      </StyledButton>
      <StyledButton
        onClick={() => handleShowSwatchFive()}
        isActive={colorListType === 5}
        swatch={"blue/purple"}
      >
        <SwatchName isActive={colorListType === 5}>blue/purple</SwatchName>
        {isAtBookmarks && <StyledNumber>{favsSwatchFive}</StyledNumber>}
      </StyledButton>
      <StyledButton
        onClick={() => handleShowSwatchSix()}
        isActive={colorListType === 6}
        swatch={"white/grey/black"}
      >
        <SwatchName isActive={colorListType === 6}>white/grey/black</SwatchName>
        {isAtBookmarks && <StyledNumber>{favsSwatchSix}</StyledNumber>}
      </StyledButton>
    </FilterContainer>
  );
}
