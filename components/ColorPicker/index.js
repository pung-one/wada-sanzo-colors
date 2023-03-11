import styled from "styled-components";
import chroma from "chroma-js";
import { useState } from "react";
import Link from "next/link";

const StyledForm = styled.form`
  padding-top: 4vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2vh;
`;

const ColorInput = styled.input`
  width: 20vw;
  height: 10vh;
  background-color: white;
`;

const ResultContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4vh;
  gap: 4vh;
`;

const StyledLink = styled(Link)`
  background-color: ${({ hex }) => (hex ? hex : "white")};
  font-size: 2vh;
  border: 1px solid black;
  padding: 5vh;
  width: 60vw;
  box-shadow: 3px 3px grey;
`;

export default function ColorPicker({ data, error }) {
  const [closestColor, setClosestColor] = useState("");

  if (error) return <h1>Failed to load data..</h1>;
  if (!data) return <h1>Loading Data...</h1>;

  function handleCompare(event) {
    event.preventDefault();
    const inputColor = event.target.color.value;
    data?.reduce((acc, currVal, currInd) => {
      let dist = chroma.distance(inputColor, currVal.hex);
      if (acc < dist) {
        return acc;
      } else {
        acc = dist;
        setClosestColor(data[currInd]);
      }
      return acc;
    });
  }

  return (
    <>
      <StyledForm onSubmit={handleCompare}>
        <label htmlFor="color">Pick a Color</label>
        <ColorInput id="color" type="color" />
        <button type="submit">Find from list</button>
      </StyledForm>
      {closestColor && (
        <ResultContainer>
          <h2>This is the most similar color from list:</h2>
          <StyledLink
            href={`/colors/${closestColor?.slug}`}
            hex={closestColor?.hex}
          >
            {closestColor?.name}
          </StyledLink>
        </ResultContainer>
      )}
    </>
  );
}
