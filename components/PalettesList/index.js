import styled from "styled-components";
import Link from "next/link";
import { CreatePaletteArray } from "@/utils/CreatePaletteArray";
import { uid } from "uid";
import FavoriteButton from "../FavoriteButton";
import { IsColorBright } from "@/utils/IsColorBright";

const List = styled.ul`
  padding: 0;
  list-style-type: 0;
  margin-bottom: 11vh;
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
  data,
  error,
  favoritePalettes,
  onToggleFavorite,
}) {
  if (error) return <h1>Failed to load data..</h1>;
  if (!data) return <h1>Loading...</h1>;

  const paletteArray = CreatePaletteArray(data);

  return (
    <List>
      {paletteArray.map((palette, paletteIndex) => {
        const favoriteStatus = favoritePalettes?.find(
          (palette) => palette.id === paletteIndex + 1
        );
        console.log(favoritePalettes);
        return (
          <StyledPaletteContainer key={uid()} length={palette.length}>
            {palette.map(({ name, hex, rgb }, colorIndex) => {
              return (
                <StyledColorBox key={name} hex={hex}>
                  {colorIndex === 0 && (
                    <Link href={`/palettes/${paletteIndex + 1}`}>
                      <StyledPaletteNumber isBright={IsColorBright(rgb)}>
                        {paletteIndex + 1}
                      </StyledPaletteNumber>
                    </Link>
                  )}
                  <FavoriteButton
                    isFavorite={favoriteStatus?.isFavorite}
                    isOnListElement={true}
                    isBright={IsColorBright(rgb)}
                    toggleValue={paletteIndex + 1}
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
