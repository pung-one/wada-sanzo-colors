import { useState, useEffect } from "react";
import styled from "styled-components";

export default function CombinationsFilter({
  combinationListType,
  onShowCombinationsWith2Colors,
  onShowCombinationsWith3Colors,
  onShowCombinationsWith4Colors,
  favoriteCombinationsData,
  isAtFavorites,
}) {
  const [favWithTwoColors, setFavWithTwoColors] = useState(0);
  const [favWithThreeColors, setFavWithThreeColors] = useState(0);
  const [favWithFourColors, setFavWithFourColors] = useState(0);

  useEffect(() => {
    setFavWithTwoColors(
      favoriteCombinationsData?.filter(
        (combination) => combination.id <= 120 && combination.isFavorite
      ).length
    );
    setFavWithThreeColors(
      favoriteCombinationsData?.filter(
        (combination) =>
          combination.id > 120 &&
          combination.id <= 240 &&
          combination.isFavorite
      ).length
    );
    setFavWithFourColors(
      favoriteCombinationsData?.filter(
        (combination) => combination.id > 240 && combination.isFavorite
      ).length
    );
  }, [favoriteCombinationsData]);

  return (
    <FilterContainer>
      <StyledButton
        onClick={() => onShowCombinationsWith2Colors()}
        isActive={combinationListType === 2}
        aria-label={"only show combinations with two colors"}
      >
        {isAtFavorites && (
          <StyledNumber isActive={combinationListType === 2}>
            {favWithTwoColors}
          </StyledNumber>
        )}
        <StyledBox filter={2} isActive={combinationListType === 2} />
      </StyledButton>
      <StyledButton
        onClick={() => onShowCombinationsWith3Colors()}
        isActive={combinationListType === 3}
        aria-label={"only show combinations with three colors"}
      >
        {isAtFavorites && (
          <StyledNumber isActive={combinationListType === 3}>
            {favWithThreeColors}
          </StyledNumber>
        )}
        <StyledBox filter={3} isActive={combinationListType === 3} />
        <StyledBox filter={3} isActive={combinationListType === 3} />
      </StyledButton>
      <StyledButton
        onClick={() => onShowCombinationsWith4Colors()}
        isActive={combinationListType === 4}
        aria-label={"only show combinations with four colors"}
      >
        {isAtFavorites && (
          <StyledNumber isActive={combinationListType === 4}>
            {favWithFourColors}
          </StyledNumber>
        )}
        <StyledBox filter={4} isActive={combinationListType === 4} />
        <StyledBox filter={4} isActive={combinationListType === 4} />
        <StyledBox filter={4} isActive={combinationListType === 4} />
      </StyledButton>
    </FilterContainer>
  );
}

const FilterContainer = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 9vh;
  background-color: white;
  border-bottom: 1px solid black;
`;

const StyledButton = styled.button`
  display: flex;
  position: relative;
  align-items: center;
  background-color: white;
  border: 1px solid black;
  width: 30%;
  height: 6vh;
  overflow: hidden;
  box-shadow: ${({ isActive }) => (isActive ? null : "0 0 2px black")};
  background-color: ${({ isActive }) => (isActive ? "black" : "white")};
  color: ${({ isActive }) => (isActive ? "white" : "black")};
  transition: box-shadow 0.1s;
  &:hover {
    cursor: pointer;
  }
`;

const StyledBox = styled.div`
  border-right: ${({ isActive }) =>
    isActive ? "1px solid white" : "1px solid black"};
  width: ${({ filter }) =>
    filter === 2 ? "50%" : filter === 3 ? "33.3%" : "25%"};
  height: 6vh;
`;

const StyledNumber = styled.span`
  position: absolute;
  right: 1vw;
  bottom: 0.5vh;
  font-size: 1.5vh;
  color: ${({ isActive }) => (isActive ? "white" : "black")};
`;
