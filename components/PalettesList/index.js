import styled from "styled-components";
import Link from "next/link";
import { CreatePaletteArray } from "@/utils/CreatePaletteArray";
import { uid } from "uid";

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

export default function PalettesList({ data, error }) {
  if (error) return <h1>Failed to load data..</h1>;
  if (!data) return <h1>Loading...</h1>;

  const paletteArray = CreatePaletteArray(data);

  return (
    <>
      {paletteArray.map((palette, i) => {
        return (
          <Link key={uid()} href={`/palettes/${i + 1}`}>
            <StyledPaletteContainer>
              <StyledPaletteNumber>{i + 1}</StyledPaletteNumber>
              {palette.map(({ name, hex, lab }) => {
                return (
                  <StyledColorBox key={name} hex={hex}>
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
