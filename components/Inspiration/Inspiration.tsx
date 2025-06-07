"use client";

import styled from "styled-components";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ColorObject, CombinationObject } from "@/lib/types";
import { useRouter } from "next/navigation";

type Props = {
  colors: ColorObject[];
  combinations: CombinationObject[];
};

export default function Inspiration({ colors, combinations }: Props) {
  const [randomCombination, setRandomCombination] = useState<CombinationObject>(
    combinations[276]
  );

  const router = useRouter();

  useEffect(() => {
    setRandomCombination(combinations[Math.floor(Math.random() * 348) || 276]);
  }, [combinations]);

  function createRandomCombinationCssGradient() {
    if (randomCombination.combination.length === 2) {
      const randomGradient = `linear-gradient(180deg, rgba(${randomCombination.combination[0].rgb[0]},${randomCombination.combination[0].rgb[1]},${randomCombination.combination[0].rgb[2]},1) 0%, rgba(${randomCombination.combination[1].rgb[0]},${randomCombination.combination[1].rgb[1]},${randomCombination.combination[1].rgb[2]},1) 100%)`;
      return randomGradient;
    } else if (randomCombination.combination.length === 3) {
      const randomGradient = `linear-gradient(180deg, rgba(${randomCombination.combination[0].rgb[0]},${randomCombination.combination[0].rgb[1]},${randomCombination.combination[0].rgb[2]},1) 0%, rgba(${randomCombination.combination[1].rgb[0]},${randomCombination.combination[1].rgb[1]},${randomCombination.combination[1].rgb[2]},1) 50%, rgba(${randomCombination.combination[2].rgb[0]},${randomCombination.combination[2].rgb[1]},${randomCombination.combination[2].rgb[2]},1) 100%)`;
      return randomGradient;
    } else {
      const randomGradient = `linear-gradient(180deg, rgba(${randomCombination.combination[0].rgb[0]},${randomCombination.combination[0].rgb[1]},${randomCombination.combination[0].rgb[2]},1) 0%, rgba(${randomCombination.combination[1].rgb[0]},${randomCombination.combination[1].rgb[1]},${randomCombination.combination[1].rgb[2]},1) 25%, rgba(${randomCombination.combination[2].rgb[0]},${randomCombination.combination[2].rgb[1]},${randomCombination.combination[2].rgb[2]},1) 75%, rgba(${randomCombination.combination[3].rgb[0]},${randomCombination.combination[3].rgb[1]},${randomCombination.combination[3].rgb[2]},1) 100%)`;
      return randomGradient;
    }
  }

  return (
    <PageContainer>
      <ButtonContainer $background={createRandomCombinationCssGradient()}>
        <StyledButton onClick={() => router.push("inspiration/color-picker")}>
          Color Picker
        </StyledButton>

        <StyledButton
          onClick={() =>
            router.push(
              `/colors/${
                colors[Math.floor(Math.random() * 159)]?.slug ||
                "grayish-lavender--a"
              }`
            )
          }
        >
          Random Color
        </StyledButton>

        <StyledButton
          onClick={() =>
            router.push(`/combinations/${Math.floor(Math.random() * 348)}`)
          }
        >
          Random Combination
        </StyledButton>

        <EasterEgg href={`/combinations/${randomCombination?.id || 276}`}>
          Background Combination
        </EasterEgg>
      </ButtonContainer>
    </PageContainer>
  );
}

const PageContainer = styled.main`
  position: relative;
  padding-top: 80px;
  height: 100vh;
  @media screen and (min-width: 1024px), screen and (orientation: landscape) {
    padding-top: 60px;
    width: 70%;
    margin-left: 30%;
  }
`;

const ButtonContainer = styled.section<{ $background?: string }>`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  background: ${({ $background }) => $background};
`;

const StyledButton = styled.button`
  background-color: white;
  border: 1px solid black;
  padding: 30px;
  width: 60%;
  box-shadow: 0 0 4px black;
  transition: all 0.2s;
  &:hover {
    cursor: pointer;
    box-shadow: none;
  }
`;

const EasterEgg = styled(Link)`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: white;
  border: 1px solid black;
  font-size: 0.6rem;
  text-align: center;
  padding: 10px;
  width: min-content;
  box-shadow: 0 0 4px black;
  transition: all 0.2s;
  &:hover {
    cursor: pointer;
    box-shadow: none;
  }
`;
