import styled from "styled-components";
import Link from "next/link";
import { uid } from "uid";
import FavoriteButton from "../FavoriteButton";
import { IsColorBright } from "@/utils/IsColorBright";

const List = styled.ul`
  padding: 0;
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

export default function PalettesList({
  paletteArray,
  favoritePalettesData,
  onToggleFavorite,
}) {
  return (
    <List>
      {paletteArray?.map((palette1) => {
        const favoriteStatus = favoritePalettesData?.find(
          (palette2) => palette2.id === palette1.id
        );
        return (
          <StyledPaletteContainer key={uid()} length={palette1.palette.length}>
            {palette1.palette.map(({ name, hex, rgb }, colorIndex) => {
              return (
                <StyledColorBox key={name} hex={hex}>
                  {colorIndex === 0 && (
                    <Link href={`/palettes/${palette1.id}`}>
                      <StyledPaletteNumber isBright={IsColorBright(rgb)}>
                        {palette1.id}
                      </StyledPaletteNumber>
                    </Link>
                  )}
                  <FavoriteButton
                    isFavorite={favoriteStatus?.isFavorite}
                    isOnListElement={true}
                    isBright={IsColorBright(rgb)}
                    toggleValue={palette1.id}
                    onToggleFavorite={onToggleFavorite}
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
