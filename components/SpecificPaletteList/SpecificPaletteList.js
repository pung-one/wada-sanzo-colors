import styled from "styled-components";
import Link from "next/link";

const StyledPaletteContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 4vh;
  height: 25vh;
`;

const StyledColorBox = styled.div`
  width: 100%;
`;

export default function SpecificPaletteList({ colors, currentColor }) {
  return (
    <>
      {currentColor?.combinations.map((combi1) => {
        return (
          <Link key={combi1} href={`/palettes/${combi1}`}>
            <StyledPaletteContainer>
              {combi1}
              {colors.map((color) => {
                if (color.combinations.some((combi2) => combi1 === combi2)) {
                  return (
                    <StyledColorBox
                      key={color.name}
                      style={{ backgroundColor: `${color.hex}` }}
                    >
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
