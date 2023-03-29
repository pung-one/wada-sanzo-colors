import styled from "styled-components";
import chroma from "chroma-js";
import { useState } from "react";
import Link from "next/link";
import { IsColorBright } from "@/utils/IsColorBright/index.js";
import { ImArrowDown } from "react-icons/im";

export default function ColorPicker({ data, error }) {
  const [closestColor, setClosestColor] = useState("");
  const [isColorPicked, setIsColorPicked] = useState(false);

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
        <label htmlFor="color">
          <h1>Pick a Color</h1>
        </label>
        <Arrow />
        <ColorInput
          id="color"
          type="color"
          onClick={() => setIsColorPicked(true)}
        />
        {isColorPicked && (
          <StyledButton type="submit">Find from list</StyledButton>
        )}
      </StyledForm>
      {closestColor && (
        <ResultContainer>
          <p>This is the most similar color from list:</p>
          <StyledLink
            href={`/colors/${closestColor?.slug}`}
            hex={closestColor?.hex}
          >
            <ColorName isBright={IsColorBright(closestColor?.rgb)}>
              {closestColor?.name}
            </ColorName>
          </StyledLink>
        </ResultContainer>
      )}
    </>
  );
}

const StyledForm = styled.form`
  padding-top: 17vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3vh;
`;

const Arrow = styled(ImArrowDown)`
  font-size: 4vh;
`;

const ColorInput = styled.input`
  width: 60vw;
  height: 20vh;
  background-color: white;
  box-shadow: 0 2px 5px black;
  &:hover {
    cursor: pointer;
  }
`;

const StyledButton = styled.button`
  background-color: white;
  border: 1px solid black;
  padding: 3vh;
  width: 40vw;
  box-shadow: 0 2px 5px black;
  &:hover {
    cursor: pointer;
  }
`;

const ResultContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4vh;
  margin-top: 3vh;
  gap: 4vh;
`;

const StyledLink = styled(Link)`
  background-color: ${({ hex }) => (hex ? hex : "white")};
  font-size: 2vh;
  border: 1px solid black;
  padding: 5vh;
  width: 60vw;
  box-shadow: 0 2px 5px black;
`;

const ColorName = styled.p`
  text-align: center;
  color: ${({ isBright }) => (isBright ? "black" : "white")};
`;
