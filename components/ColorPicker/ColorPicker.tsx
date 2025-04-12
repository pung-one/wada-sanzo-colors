import styled from "styled-components";
import chroma from "chroma-js";
import { useState } from "react";
import Link from "next/link";
import { ImArrowDown } from "react-icons/im";
import { isColorBright } from "@/utils/helper";
import { ColorObject } from "@/lib/types";

export default function ColorPicker({ colors }: { colors: ColorObject[] }) {
  const [closestColor, setClosestColor] = useState<ColorObject>();
  const [isColorPicked, setIsColorPicked] = useState(false);

  function handleCompare(event: any) {
    event.preventDefault();
    const inputColor = event.target.color.value;

    let closestDist: number | undefined = undefined;

    colors.forEach((currColor, currInd) => {
      let dist = chroma.distance(inputColor, currColor.hex);
      if (!closestDist || closestDist > dist) {
        closestDist = dist;
        setClosestColor(colors[currInd]);
      } else {
        return;
      }
    });
  }

  return (
    <>
      <StyledForm onSubmit={(e) => handleCompare}>
        <label htmlFor="color">
          <h1>Pick a Color</h1>
        </label>
        <Arrow />
        <ColorInput
          id="color"
          type="color"
          defaultValue="#b5b1d8"
          onClick={() => setIsColorPicked(true)}
        />
        {isColorPicked && (
          <StyledButton type="submit">Find from collection</StyledButton>
        )}
      </StyledForm>
      {closestColor && (
        <ResultContainer>
          <p>The most similar color from the collection:</p>
          <StyledLink
            href={`/colors/${closestColor?.slug}`}
            $hex={closestColor?.hex}
          >
            <ColorName $isBright={isColorBright(closestColor?.rgb)}>
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

const StyledLink = styled(Link)<{ $hex: string }>`
  background-color: ${({ $hex }) => $hex};
  font-size: 2vh;
  border: 1px solid black;
  padding: 5vh;
  width: 60vw;
  box-shadow: 0 2px 5px black;
`;

const ColorName = styled.p<{ $isBright: boolean }>`
  text-align: center;
  color: ${({ $isBright }) => ($isBright ? "black" : "white")};
`;
