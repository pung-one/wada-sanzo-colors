"use client";

import styled, { css } from "styled-components";
import Link from "next/link";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { useContext, useEffect, useState } from "react";
import FavoriteMessage from "../FavoriteMessage";
import { isColorBright } from "@/utils/helper";
import { CombinationObject } from "@/lib/types";
import { ActionContext } from "../Layout/ActionsContext";

type Props = {
  combinations: CombinationObject[];
};

export default function CombinationsList({ combinations }: Props) {
  const [showFavMessage, setShowFavMessage] = useState(false);
  const [favMessageId, setFavMessageId] = useState<number>();
  const [arrayToBeRendered, setArrayToBeRendered] =
    useState<CombinationObject[]>();

  const actionContext = useContext(ActionContext);

  if (!actionContext) return <h1>Loading...</h1>;

  const {
    combinationListType,
    favoriteCombinationsData,
    onToggleFavoriteCombination,
  } = actionContext;

  function handleShowFavMessage(toggleValue: number) {
    setShowFavMessage(true);
    setFavMessageId(toggleValue);
    const timer = setTimeout(() => setShowFavMessage(false), 1000);
  }

  useEffect(() => {
    if (combinationListType === 0) {
      setArrayToBeRendered(combinations);
    } else if (combinationListType === 2) {
      setArrayToBeRendered(
        combinations.filter(
          (combination) => combination.combination.length === 2
        )
      );
    } else if (combinationListType === 3) {
      setArrayToBeRendered(
        combinations.filter(
          (combination) => combination.combination.length === 3
        )
      );
    } else if (combinationListType === 4) {
      setArrayToBeRendered(
        combinations.filter(
          (combination) => combination.combination.length === 4
        )
      );
    }
  }, [combinationListType, favoriteCombinationsData]);

  return (
    <List>
      {arrayToBeRendered?.map((combination1) => {
        const favoriteStatus = favoriteCombinationsData.some(
          (combination2) => combination2.id === combination1.id
        );
        return (
          <StyledCombinationContainer key={combination1.id}>
            <FavoriteMessage
              isFavorite={favoriteStatus}
              showFavMessage={showFavMessage}
              isTriggered={combination1.id === favMessageId}
            />
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
                      isFavorite={favoriteStatus}
                      isOnListElement={true}
                      isBright={isColorBright(rgb)}
                      onToggleFavorite={() =>
                        onToggleFavoriteCombination(combination1.id)
                      }
                      onShowFavMessage={() =>
                        handleShowFavMessage(combination1.id)
                      }
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
  padding-top: 33.5vh;
  list-style-type: 0;
  @media screen and (min-width: 1024px), screen and (orientation: landscape) {
    padding-top: 16.5vh;
  }
`;

const StyledCombinationContainer = styled.li`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 2vh;
  height: 25vh;
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
  font-size: 2.5vh;
  font-weight: lighter;
  padding: 2vh 0 0 3vh;
  text-decoration: underline;
  color: ${({ $isBright }) => ($isBright ? "black" : "white")};
  ${(props) =>
    props.$isOnLargeCombination
      ? css`
          max-width: 23vw;
          overflow-wrap: break-word;
        `
      : null}
`;
