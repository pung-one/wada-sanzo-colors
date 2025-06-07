"use client";

import styled, { css } from "styled-components";
import Link from "next/link";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { useContext, useEffect, useState } from "react";
import { CombinationObject } from "@/lib/types";
import { ActionContext } from "../Layout/Layout";
import { useFavorites } from "../FavoritesProvider/FavoritesProvider";

type Props = {
  combinations: CombinationObject[];
};

export default function CombinationsList({ combinations }: Props) {
  const [arrayToBeRendered, setArrayToBeRendered] =
    useState<CombinationObject[]>();

  const { favoriteCombinations } = useFavorites();

  const actionContext = useContext(ActionContext);

  if (!actionContext) return <h1>Loading...</h1>;

  const { combinationListType } = actionContext;

  useEffect(() => {
    if (combinationListType === 0) {
      setArrayToBeRendered(combinations);
    } else {
      setArrayToBeRendered(
        combinations.filter(
          (combination) =>
            combination.combination.length === combinationListType
        )
      );
    }
  }, [combinationListType, favoriteCombinations]);

  return (
    <List>
      {arrayToBeRendered?.map((combination1) => {
        const favoriteStatus = favoriteCombinations.findIndex(
          (combination2) =>
            combination2.id === combination1.id && combination2.isFavorite
        );
        return (
          <StyledCombinationContainer key={combination1.id}>
            {combination1.combination?.map(
              ({ name, hex, isBright }, colorIndex, array) => {
                return (
                  <StyledColorBox key={name} $hex={hex}>
                    {colorIndex === 0 && (
                      <Link href={`/combinations/${combination1.id}`}>
                        <StyledCombinationNumber
                          $isBright={isBright}
                          $isOnLargeCombination={array.length > 3}
                        >
                          {`Combi #${combination1.id}`}
                        </StyledCombinationNumber>
                      </Link>
                    )}
                    <FavoriteButton
                      type="combi"
                      elementId={combination1.id}
                      isFavorite={favoriteStatus !== -1}
                      isOnListElement={true}
                      isBright={isBright}
                    />
                  </StyledColorBox>
                );
              }
            )}
          </StyledCombinationContainer>
        );
      })}
    </List>
  );
}

const List = styled.ul`
  padding-top: 240px;
  @media screen and (min-width: 1024px), screen and (orientation: landscape) {
    padding-top: 130px;
  }
`;

const StyledCombinationContainer = styled.li`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
  height: 200px;
`;

const StyledColorBox = styled.div<{ $hex: string }>`
  flex: 1;
  display: flex;
  background-color: ${({ $hex }) => $hex};
`;

const StyledCombinationNumber = styled.span<{
  $isBright: boolean;
  $isOnLargeCombination: boolean;
}>`
  position: absolute;
  font-weight: lighter;
  padding: 20px;
  text-decoration: underline;
  color: ${({ $isBright }) => ($isBright ? "black" : "white")};
  ${(props) =>
    props.$isOnLargeCombination
      ? css`
          max-width: 23%;
          white-space: break-spaces;
        `
      : null}
`;
