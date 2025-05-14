"use client";

import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { ActionContext } from "../Layout/Layout";

type Props = {
  isAtFavorites: boolean;
};

export default function CombinationsFilter({ isAtFavorites }: Props) {
  const [favWithTwoColors, setFavWithTwoColors] = useState(0);
  const [favWithThreeColors, setFavWithThreeColors] = useState(0);
  const [favWithFourColors, setFavWithFourColors] = useState(0);

  const actionContext = useContext(ActionContext);

  if (!actionContext) return <h1>Loading...</h1>;

  const {
    favoriteCombinationsData,
    combinationListType,
    setCombinationListType,
  } = actionContext;

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
        onClick={() =>
          setCombinationListType(combinationListType === 2 ? 0 : 2)
        }
        $isActive={combinationListType === 2}
        aria-label={"only show combinations with two colors"}
      >
        {isAtFavorites && (
          <StyledNumber $isActive={combinationListType === 2}>
            {favWithTwoColors}
          </StyledNumber>
        )}
        <div />
        <div />
      </StyledButton>
      <StyledButton
        onClick={() =>
          setCombinationListType(combinationListType === 3 ? 0 : 3)
        }
        $isActive={combinationListType === 3}
        aria-label={"only show combinations with three colors"}
      >
        {isAtFavorites && (
          <StyledNumber $isActive={combinationListType === 3}>
            {favWithThreeColors}
          </StyledNumber>
        )}
        <div />
        <div />
        <div />
      </StyledButton>
      <StyledButton
        onClick={() =>
          setCombinationListType(combinationListType === 4 ? 0 : 4)
        }
        $isActive={combinationListType === 4}
        aria-label={"only show combinations with four colors"}
      >
        {isAtFavorites && (
          <StyledNumber $isActive={combinationListType === 4}>
            {favWithFourColors}
          </StyledNumber>
        )}
        <div />
        <div />
        <div />
        <div />
      </StyledButton>
    </FilterContainer>
  );
}

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px;
  background-color: white;
  border-bottom: 1px solid black;
  @media screen and (min-width: 1024px), screen and (orientation: landscape) {
    gap: 15px;
    padding: 15px;
    position: fixed;
    top: 60px;
    width: 70%;
    margin-left: 30%;
  }
`;

const StyledButton = styled.button<{ $isActive: boolean }>`
  position: relative;
  flex: 1;
  display: flex;
  gap: 1px;
  border: 1px solid black;
  height: 40px;
  overflow: hidden;
  box-shadow: ${({ $isActive }) => ($isActive ? null : "0 0 2px black")};
  background-color: ${({ $isActive }) => ($isActive ? "white" : "black")};
  color: ${({ $isActive }) => ($isActive ? "white" : "black")};
  transition: box-shadow 0.1s;
  &:hover {
    cursor: pointer;
    box-shadow: none;
  }
  div {
    flex: 1;
    height: 100%;
    background-color: ${({ $isActive }) => ($isActive ? "black" : "white")};
  }
`;

const StyledNumber = styled.span<{ $isActive: boolean }>`
  position: absolute;
  right: 5px;
  bottom: 3px;
  font-size: 0.7rem;
  color: ${({ $isActive }) => ($isActive ? "white" : "black")};
`;
