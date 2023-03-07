import styled from "styled-components";
import Link from "next/link";

const StyledPaletteContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0 1vh 0 1vh;
  margin: 2vh 0 1vh 0;
  height: 25vh;
  color: black;
`;

const StyledColorBox = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ hex }) => (hex ? hex : null)};
  color: ${({ hex }) => (hex ? hex : null)};
  &:hover {
    color: white;
  }
`;

const StyledPaletteNumber = styled.div`
  position: absolute;
  font-size: 4vh;
  color: white;
`;

export default function SpecificPaletteList({ colors, currentColor }) {
  return (
    <>
      {currentColor?.combinations.map((combi1) => {
        return (
          <Link key={combi1} href={`/palettes/${combi1}`}>
            <StyledPaletteContainer>
              <StyledPaletteNumber>{combi1}</StyledPaletteNumber>
              {colors.map((color) => {
                if (color.combinations.some((combi2) => combi1 === combi2)) {
                  return (
                    <StyledColorBox key={color.name} hex={color.hex}>
                      {color.name}
                    </StyledColorBox>
                  );
                }
              })}
            </StyledPaletteContainer>
          </Link>
        );
      })}
    </>
  );
}
