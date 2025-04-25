"use client";

import styled, { css } from "styled-components";
import Link from "next/link";
import { useContext, useState } from "react";
import FavoriteMessage from "../FavoriteMessage/FavoriteMessage";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { ColorObject } from "@/lib/types";
import { ActionContext } from "../Layout/Layout";
import { isColorBright } from "@/utils/helper";

type Props = {
  combinations: {
    id: number;
    colors: ColorObject[];
  }[];
};

export default function SpecificCombinationList({ combinations }: Props) {
  const [showFavMessage, setShowFavMessage] = useState(false);
  const [favMessageId, setFavMessageId] = useState<number>();

  const actionContext = useContext(ActionContext);

  if (!actionContext) return <h1>Loading...</h1>;

  function handleShowFavMessage(toggleValue: number) {
    setShowFavMessage(true);
    setFavMessageId(toggleValue);
    const timer = setTimeout(() => setShowFavMessage(false), 1000);
  }

  return (
    <List>
      {combinations.map((combi1) => {
        const favoriteStatus = actionContext.favoriteCombinationsData?.some(
          (favCombination) => favCombination.id == combi1.id
        );

        return (
          <StyledCombinationContainer key={combi1.id}>
            <FavoriteMessage
              isFavorite={favoriteStatus}
              showFavMessage={showFavMessage}
              isTriggered={combi1.id === favMessageId}
            />
            {combi1.colors.map(({ name, hex, rgb }, colorIndex) => {
              return (
                <StyledColorBox key={name} $hex={hex}>
                  {colorIndex === 0 && (
                    <Link
                      aria-label={`go to color-combination with nr ${combi1}`}
                      href={`/combinations/${combi1.id}`}
                    >
                      <StyledCombinationNumber
                        $isBright={isColorBright(rgb)}
                        $isOnLargeCombination={combi1.colors.length > 3}
                      >
                        {`Combi #${combi1.id}`}
                      </StyledCombinationNumber>
                    </Link>
                  )}
                  <FavoriteButton
                    type="combi"
                    elementId={combi1.id}
                    isFavorite={favoriteStatus}
                    isOnListElement={true}
                    isBright={isColorBright(rgb)}
                    onShowFavMessage={() => handleShowFavMessage(combi1.id)}
                  />
                </StyledColorBox>
              );
            })}
          </StyledCombinationContainer>
        );
      })}
    </List>
  );
}

const List = styled.ul`
  padding: 0;
  list-style: none;
  list-style-type: 0;
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
