import styled from "styled-components";
import Link from "next/link";
import FavoriteButton from "../FavoriteButton";

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
  justify-content: center;
  align-items: center;
  background-color: ${({ hex }) => (hex ? hex : null)};
`;

const StyledPaletteNumber = styled.span`
  position: absolute;
  font-size: 2vh;
  padding: 2vh;
  color: white;
`;

export default function SpecificPaletteList({ colors, currentColor }) {
  return (
    <List>
      {currentColor?.combinations.map((combi1) => {
        return (
          <Link key={combi1} href={`/palettes/${combi1}`}>
            <StyledPaletteContainer>
              <FavoriteButton isFavorite={false} isOnListElement={true} />
              <StyledPaletteNumber>{combi1}</StyledPaletteNumber>
              {colors.map((color) => {
                if (color.combinations.some((combi2) => combi1 === combi2)) {
                  return <StyledColorBox key={color.name} hex={color.hex} />;
                }
              })}
            </StyledPaletteContainer>
          </Link>
        );
      })}
    </List>
  );
}
