import styled from "styled-components";
import Link from "next/link";
import FavoriteButton from "../FavoriteButton";
import { IsColorBright } from "@/utils/IsColorBright";
import { useState } from "react";

const List = styled.ul`
  padding: 0;
  list-style: none;
  list-style-type: 0;
`;

const StyledPaletteContainer = styled.li`
  position: relative;
  display: flex;
  width: 100%;
  margin-top: 2vh;
  height: 25vh;
`;

const StyledColorBox = styled.div`
  flex: 1;
  display: flex;
  background-color: ${({ hex }) => (hex ? hex : null)};
`;

const StyledPaletteNumber = styled.span`
  position: absolute;
  font-size: 2.5vh;
  padding: 2vh;
  text-decoration: underline;
  color: ${({ isBright }) => (isBright ? "black" : "white")};
`;

export default function SpecificPaletteList({
  colors,
  currentColor,
  favoritePalettes,
  onToggleFavoritePalette,
}) {
  return (
    <List>
      {currentColor?.combinations.map((combi1) => {
        const favoriteStatus = favoritePalettes?.find(
          (palette) => palette.id === combi1
        );
        const palette = colors.filter((color) =>
          color.combinations.some((combi2) => combi1 === combi2)
        );

        return (
          <StyledPaletteContainer>
            <Link href={`/palettes/${combi1}`}></Link>
            {palette.map(({ name, hex, rgb }, colorIndex) => {
              return (
                <StyledColorBox key={name} hex={hex}>
                  {colorIndex === 0 && (
                    <Link href={`/palettes/${combi1}`}>
                      <StyledPaletteNumber isBright={IsColorBright(rgb)}>
                        {combi1}
                      </StyledPaletteNumber>
                    </Link>
                  )}
                  <FavoriteButton
                    isFavorite={favoriteStatus?.isFavorite}
                    isOnListElement={true}
                    isBright={IsColorBright(rgb)}
                    toggleValue={combi1}
                    onToggleFavorite={onToggleFavoritePalette}
                  />
                </StyledColorBox>
              );
            })}
          </StyledPaletteContainer>
        );
      })}
    </List>
  );
}
