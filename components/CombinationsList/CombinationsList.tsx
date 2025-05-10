"use client";

import styled, { css } from "styled-components";
import Link from "next/link";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { useContext, useEffect, useState } from "react";
import { isColorBright } from "@/utils/helper";
import { CombinationObject } from "@/lib/types";
import { ActionContext } from "../Layout/Layout";

type Props = {
  combinations: CombinationObject[];
};

export default function CombinationsList({ combinations }: Props) {
  const [arrayToBeRendered, setArrayToBeRendered] =
    useState<CombinationObject[]>();

  const actionContext = useContext(ActionContext);

  if (!actionContext) return <h1>Loading...</h1>;

  const { combinationListType, favoriteCombinationsData } = actionContext;

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
  }, [combinationListType, favoriteCombinationsData]);

  return (
    <List>
      {arrayToBeRendered?.map((combination1) => {
        const favoriteStatus = favoriteCombinationsData.findIndex(
          (combination2) =>
            combination2.id === combination1.id && combination2.isFavorite
        );
        return (
          <StyledCombinationContainer key={combination1.id}>
            {combination1.combination?.map(
              ({ name, hex, rgb }, colorIndex, array) => {
                return (
                  <StyledColorBox key={name} $hex={hex}>
                    {colorIndex === 0 && (
                      <Link href={`/combinations/${combination1.id}`}>
                        <StyledCombinationNumber
                          $isBright={isColorBright(rgb)}
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
                      isBright={isColorBright(rgb)}
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
  padding-top: 270px;
  list-style-type: 0;
  @media screen and (min-width: 1024px), screen and (orientation: landscape) {
    padding-top: 160px;
  }
`;

const StyledCombinationContainer = styled.li`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
  height: 200px;
  @media screen and (min-width: 1024px), screen and (orientation: landscape) {
    height: 250px;
  }
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
  font-size: 1rem;
  font-weight: lighter;
  padding: 20px;
  text-decoration: underline;
  color: ${({ $isBright }) => ($isBright ? "black" : "white")};
  ${(props) =>
    props.$isOnLargeCombination
      ? css`
          max-width: 23vw;
          overflow-wrap: break-word;
        `
      : null}

  @media screen and (min-width: 1024px), screen and (orientation: landscape) {
    font-size: 1.5rem;
  }
`;
