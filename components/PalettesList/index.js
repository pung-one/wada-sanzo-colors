import styled from "styled-components";
import Link from "next/link";

const StyledPaletteContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  margin-top: 1vh;
  height: 25vh;
  line-height: 25vh;
  color: black;
`;

const StyledColorBox = styled.div`
  flex-basis: 100%;
  text-decoration: none;
`;

const StyledPaletteNumber = styled.div`
  left: 1vh;
  position: absolute;
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
  console.log(paletteArray[96][1].lab[2]);

  return (
    <>
      {paletteArray.map((palette, i) => {
        return (
          <Link key={i + 1} href={`/palettes/${i + 1}`}>
            <StyledPaletteContainer>
              <StyledPaletteNumber>{i + 1}</StyledPaletteNumber>
              {palette.map(({ name, hex, lab }) => {
                return (
                  <StyledColorBox
                    key={name}
                    style={{
                      backgroundColor: `${hex}`,
                    }}
                  >
                    {name}
                  </StyledColorBox>
                );
              })}
            </StyledPaletteContainer>
          </Link>
        );
      })}
    </>
  );
}
