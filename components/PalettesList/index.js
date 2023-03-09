import styled from "styled-components";
import Link from "next/link";
import { CreatePaletteArray } from "@/utils/CreatePaletteArray";
import { uid } from "uid";

const StyledPaletteContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  padding: 0 1vh 0 1vh;
  margin: 2vh 0 1vh 0;
  height: 25vh;
  &:hover {
    color: white;
  }
`;

const StyledColorBox = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ hex }) => (hex ? hex : null)};
`;

const StyledPaletteNumber = styled.div`
  position: absolute;
  font-size: 2vh;
  padding: 2vh;
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
            <StyledPaletteContainer length={palette.length}>
              <StyledPaletteNumber>{i + 1}</StyledPaletteNumber>
              {palette.map(({ name, hex, lab }) => {
                return <StyledColorBox key={name} hex={hex} />;
              })}
            </StyledPaletteContainer>
          </Link>
        );
      })}
    </>
  );
}
