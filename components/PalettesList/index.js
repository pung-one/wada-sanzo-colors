import styled from "styled-components";
import Link from "next/link";

const StyledPaletteContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 1vh;
  height: 25vh;
  color: black;
`;

const StyledColorBox = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledPaletteNumber = styled.div`
  position: absolute;
  font-size: 4vh;
  color: white;
`;

export default function PalettesList({ colors, error }) {
  if (error) return <h1>Failed to load data..</h1>;
  if (!colors) return <h1>Loading...</h1>;

  let paletteArray = [];
  for (let i = 1; i <= 348; i++) {
    const palette = colors?.filter((color) =>
      color.combinations.some((combi) => combi === i)
    );
    paletteArray.push(palette);
  }

  return (
    <>
      {paletteArray.map((palette, i) => {
        return (
          <StyledPaletteContainer key={i}>
            <StyledPaletteNumber>{i + 1}</StyledPaletteNumber>
            {palette.map(({ name, hex, lab }) => {
              return (
                <StyledColorBox
                  key={name}
                  style={{
                    backgroundColor: `${hex}`,
                  }}
                >
                  <p>{name}</p>
                </StyledColorBox>
              );
            })}
          </StyledPaletteContainer>
        );
      })}
    </>
  );
}
