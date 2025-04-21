import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { ActionContext } from "../Layout/Layout";

type Props = {
  onShowCombinationsWith2Colors: () => void;
  onShowCombinationsWith3Colors: () => void;
  onShowCombinationsWith4Colors: () => void;
  isAtFavorites: boolean;
};

export default function CombinationsFilter({
  onShowCombinationsWith2Colors,
  onShowCombinationsWith3Colors,
  onShowCombinationsWith4Colors,
  isAtFavorites,
}: Props) {
  const [favWithTwoColors, setFavWithTwoColors] = useState(0);
  const [favWithThreeColors, setFavWithThreeColors] = useState(0);
  const [favWithFourColors, setFavWithFourColors] = useState(0);

  const actionContext = useContext(ActionContext);

  if (!actionContext) return <h1>Loading...</h1>;

  const { favoriteCombinationsData, combinationListType } = actionContext;

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
        $isActive={combinationListType === 2}
        aria-label={"only show combinations with two colors"}
      >
        {isAtFavorites && (
          <StyledNumber $isActive={combinationListType === 2}>
            {favWithTwoColors}
          </StyledNumber>
        )}
        <StyledBox $filter={2} $isActive={combinationListType === 2} />
      </StyledButton>
      <StyledButton
        onClick={() => onShowCombinationsWith3Colors()}
        $isActive={combinationListType === 3}
        aria-label={"only show combinations with three colors"}
      >
        {isAtFavorites && (
          <StyledNumber $isActive={combinationListType === 3}>
            {favWithThreeColors}
          </StyledNumber>
        )}
        <StyledBox $filter={3} $isActive={combinationListType === 3} />
        <StyledBox $filter={3} $isActive={combinationListType === 3} />
      </StyledButton>
      <StyledButton
        onClick={() => onShowCombinationsWith4Colors()}
        $isActive={combinationListType === 4}
        aria-label={"only show combinations with four colors"}
      >
        {isAtFavorites && (
          <StyledNumber $isActive={combinationListType === 4}>
            {favWithFourColors}
          </StyledNumber>
        )}
        <StyledBox $filter={4} $isActive={combinationListType === 4} />
        <StyledBox $filter={4} $isActive={combinationListType === 4} />
        <StyledBox $filter={4} $isActive={combinationListType === 4} />
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
  @media screen and (min-width: 1024px), screen and (orientation: landscape) {
    position: fixed;
    top: 6.5vh;
    right: 0;
    gap: 1.5vh;
    width: 70%;
    height: 10vh;
    padding: 1.5vh 0 1.5vh;
    margin-left: 30%;
  }
`;

const StyledButton = styled.button<{ $isActive: boolean }>`
  display: flex;
  position: relative;
  align-items: center;
  background-color: white;
  border: 1px solid black;
  width: 30%;
  height: 6vh;
  overflow: hidden;
  box-shadow: ${({ $isActive }) => ($isActive ? null : "0 0 2px black")};
  background-color: ${({ $isActive }) => ($isActive ? "black" : "white")};
  color: ${({ $isActive }) => ($isActive ? "white" : "black")};
  transition: box-shadow 0.1s;
  &:hover {
    cursor: pointer;
    box-shadow: none;
  }
`;

const StyledBox = styled.div<{ $isActive: boolean; $filter: number }>`
  border-right: ${({ $isActive }) =>
    $isActive ? "1px solid white" : "1px solid black"};
  width: ${({ $filter }) =>
    $filter === 2 ? "50%" : $filter === 3 ? "33.3%" : "25%"};
  height: 6vh;
`;

const StyledNumber = styled.span<{ $isActive: boolean }>`
  position: absolute;
  right: 1vw;
  bottom: 0.5vh;
  font-size: 1.5vh;
  color: ${({ $isActive }) => ($isActive ? "white" : "black")};
`;
