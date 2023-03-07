import styled from "styled-components";
import Link from "next/link";

const PaletteContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 4vh;
  height: 25vh;
`;

const ColorBox = styled.div`
  width: 100%;
  background-color: ${({ hex }) => (hex ? hex : null)};
  color: ${({ hex }) => (hex ? hex : null)};
  &:hover {
    color: black;
  }
`;

const PaletteNumber = styled.div`
  position: absolute;
  align-self: center;
`;

export default function SpecificPaletteList({ colors, currentColor }) {
  return (
    <>
      {currentColor?.combinations.map((combi1) => {
        return (
          <PaletteContainer key={combi1}>
            <PaletteNumber>{combi1}</PaletteNumber>
            {colors.map((color) => {
              if (color.combinations.some((combi2) => combi1 === combi2)) {
                return (
                  <ColorBox key={color.name} hex={color.hex}>
                    {color.name}
                  </ColorBox>
                );
              }
            })}
          </PaletteContainer>
        );
      })}
    </>
  );
}
