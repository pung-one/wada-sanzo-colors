import styled from "styled-components";
import Link from "next/link";
import ColorPicker from "@/components/ColorPicker";
import { CreateCombinationArray } from "@/utils/CreateCombinationArray";
import { useState } from "react";

export default function InspirationPage({
  data,
  error,
  inspirationPageFilter,
  setInspirationPageFilter,
}) {
  let randomCombination;
  if (error) return <h1>Failed to load data..</h1>;
  if (!data) return <h1>Loading Data...</h1>;

  const randomColorSlug = data[Math.floor(Math.random() * 159)]?.slug;
  const randomCombinationId = Math.floor(Math.random() * 348);

  const combinationArray = CreateCombinationArray(data);

  function CreateRandomCombinationCssGradient() {
    randomCombination = combinationArray.find(
      (combi) => combi.id == randomCombinationId
    );
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
  const randomGradient = CreateRandomCombinationCssGradient();

  return (
    <PageContainer>
      {inspirationPageFilter === "initialPage" && (
        <ButtonContainer background={randomGradient}>
          <StyledButton
            onClick={() => setInspirationPageFilter("Pick Rainbow Color")}
          >
            Pick Rainbow Color
          </StyledButton>
          <StyledLink href={`/colors/${randomColorSlug}`}>
            Random Color
          </StyledLink>
          <StyledLink href={`/combinations/${Math.floor(Math.random() * 348)}`}>
            Random Combination
          </StyledLink>
          <EasterEgg href={`/combinations/${randomCombination.id}`}>
            Background Combination
          </EasterEgg>
        </ButtonContainer>
      )}
      {inspirationPageFilter === "Pick Rainbow Color" && (
        <ColorPicker data={data} error={error} />
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

const ButtonContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 93.5vh;
  top: 6.5vh;
  gap: 10vh;
  background: ${({ background }) => (background ? background : null)};
`;

const StyledButton = styled.button`
  background-color: white;
  border: 1px solid black;
  padding: 5vh;
  width: 60%;
  box-shadow: 0 0 4px black;
  transition: all 0.2s;
  &:hover {
    cursor: pointer;
    box-shadow: none;
  }
`;

const StyledLink = styled(Link)`
  background-color: white;
  border: 1px solid black;
  padding: 5vh;
  width: 60%;
  text-align: center;
  box-shadow: 0 0 4px black;
  transition: all 0.2s;
  &:hover {
    cursor: pointer;
    box-shadow: none;
  }
`;

const EasterEgg = styled(Link)`
  position: absolute;
  bottom: 2vh;
  right: 2vw;
  background-color: white;
  border: 1px solid black;
  font-size: 1.5vh;
  padding: 1vh;
  width: 20%;
  text-align: center;
  box-shadow: 0 0 4px black;
  transition: all 0.2s;
  &:hover {
    cursor: pointer;
    box-shadow: none;
  }
`;
