"use client";

import { ColorObject } from "@/lib/types";
import { useContext, useState } from "react";
import styled from "styled-components";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import CopyFieldSlider from "../CopyFieldSlider/CopyFieldSlider";
import SpecificCombinationList from "../SpecificCombinationList/SpecificCombinationList";
import { isColorBright } from "@/utils/helper";
import { ActionContext } from "../Layout/Layout";

type Props = {
  colorObject?: ColorObject;
  combinations?: {
    id: number;
    colors: ColorObject[];
  }[];
};

export function ColorDetail({ colorObject, combinations }: Props) {
  const [isActive, setIsActive] = useState(false);

  const actionContext = useContext(ActionContext);

  if (!actionContext || !colorObject || !combinations)
    return <h1>Loading...</h1>;

  const { name, hex, rgb, swatch } = colorObject;

  const favoriteStatus = actionContext.favoriteColorsData.findIndex(
    (color) => color.name === name && color.isFavorite
  );

  return (
    <PageContainer>
      <StyledColorBox $hex={hex}>
        <FavoriteButton
          type="color"
          elementId={name}
          swatch={swatch}
          isOnDetailColor
          isBright={isColorBright(rgb)}
          isFavorite={favoriteStatus !== -1}
        />

        <StyledHeadline $isBright={isColorBright(rgb)}>{name}</StyledHeadline>

        <CopyFieldSlider
          isLargeCombination
          color={colorObject}
          isActive={isActive}
          onHandleSlide={() => setIsActive(!isActive)}
          needColorName={false}
        />
      </StyledColorBox>

      <SpecificCombinationList combinations={combinations} />
    </PageContainer>
  );
}

const PageContainer = styled.main`
  display: flex;
  flex-direction: column;
  margin-top: 15.5vh;
  @media screen and (min-width: 1024px), screen and (orientation: landscape) {
    width: 70%;
    margin-left: 30%;
    margin-top: 6.5vh;
  }
`;

const StyledColorBox = styled.header<{ $hex: string }>`
  position: relative;
  height: 30vh;
  display: flex;
  padding: 3vh 0 0 0;
  align-items: center;
  flex-direction: column;
  overflow-x: hidden;
  background-color: ${({ $hex }) => $hex};
`;

const StyledHeadline = styled.h1<{ $isBright: boolean }>`
  color: ${({ $isBright }) => ($isBright ? "black" : "white")};
  font-size: 3vh;
  font-weight: lighter;
  padding: 2vh 0 4vh;
`;
