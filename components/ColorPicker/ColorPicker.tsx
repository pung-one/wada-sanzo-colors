"use client";

import styled from "styled-components";
import chroma from "chroma-js";
import { useState } from "react";
import Link from "next/link";
import { ImArrowDown } from "react-icons/im";
import { ColorObject } from "@/lib/types";

type Reducer = {
  color: ColorObject | undefined;
  distance: number;
};

export function ColorPicker({ colors }: { colors: ColorObject[] }) {
  const [closestColor, setClosestColor] = useState<ColorObject>();
  const [inputColor, setInputColor] = useState<string>("");

  function handleCompare(event: any) {
    event.preventDefault();

    const closest = colors.reduce(
      (closest: Reducer, color: ColorObject) => {
        const distance = chroma.distance(inputColor, color.hex);

        return distance < closest.distance
          ? { color: color, distance: distance }
          : closest;
      },
      { color: undefined, distance: Infinity }
    );

    setClosestColor(closest.color);

    window.scrollTo(0, document.body.scrollHeight);
  }

  return (
    <PageContainer>
      <StyledForm onSubmit={handleCompare}>
        <label htmlFor="color">
          <h1>Pick a Color</h1>
        </label>
        <Arrow />

        <ColorInput
          id="color"
          type="color"
          value={inputColor || "#62c6bf"}
          onChange={(e) => setInputColor(e.target.value)}
        />
        {inputColor && (
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
            <ColorName $isBright={closestColor?.isBright}>
              {closestColor?.name}
            </ColorName>
          </StyledLink>
        </ResultContainer>
      )}
    </PageContainer>
  );
}

const PageContainer = styled.main`
  position: relative;
  @media screen and (min-width: 1024px), screen and (orientation: landscape) {
    width: 70%;
    margin-left: 30%;
  }
`;

const StyledForm = styled.form`
  padding-top: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const Arrow = styled(ImArrowDown)`
  font-size: 2.5rem;
`;

const ColorInput = styled.input`
  width: 70%;
  height: 150px;
  background-color: white;
  box-shadow: 0 2px 5px black;
  &:hover {
    cursor: pointer;
  }
`;

const StyledButton = styled.button`
  background-color: white;
  border: 1px solid black;
  padding: 30px;
  width: 300px;
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
  padding: 40px;
  margin: 30px 0 100px;
  gap: 30px;
`;

const StyledLink = styled(Link)<{ $hex: string }>`
  background-color: ${({ $hex }) => $hex};
  font-size: 2rem;
  border: 1px solid black;
  padding: 40px;
  width: 80%;
  box-shadow: 0 2px 5px black;
`;

const ColorName = styled.p<{ $isBright: boolean }>`
  text-align: center;
  color: ${({ $isBright }) => ($isBright ? "black" : "white")};
`;
