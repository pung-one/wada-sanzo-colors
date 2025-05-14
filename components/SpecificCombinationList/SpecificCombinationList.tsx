"use client";

import styled, { css } from "styled-components";
import Link from "next/link";
import { useContext } from "react";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { ColorObject } from "@/lib/types";
import { ActionContext } from "../Layout/Layout";

type Props = {
  combinations: {
    id: number;
    colors: ColorObject[];
  }[];
};

export default function SpecificCombinationList({ combinations }: Props) {
  const actionContext = useContext(ActionContext);

  if (!actionContext) return <h1>Loading...</h1>;

  return (
    <List>
      {combinations.map((combi1) => {
        const favoriteStatus =
          actionContext.favoriteCombinationsData?.findIndex(
            (favCombination) =>
              favCombination.id == combi1.id && favCombination.isFavorite
          );

        return (
          <StyledCombinationContainer key={combi1.id}>
            {combi1.colors.map(({ name, hex, isBright }, colorIndex) => {
              return (
                <StyledColorBox key={name} $hex={hex}>
                  {colorIndex === 0 && (
                    <Link
                      aria-label={`go to color-combination with nr ${combi1}`}
                      href={`/combinations/${combi1.id}`}
                    >
                      <StyledCombinationNumber
                        $isBright={isBright}
                        $isOnLargeCombination={combi1.colors.length > 3}
                      >
                        {`Combi #${combi1.id}`}
                      </StyledCombinationNumber>
                    </Link>
                  )}
                  <FavoriteButton
                    type="combi"
                    elementId={combi1.id}
                    isFavorite={favoriteStatus !== -1}
                    isOnListElement={true}
                    isBright={isBright}
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
