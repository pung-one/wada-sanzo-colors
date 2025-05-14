"use client";

import { ColorObject } from "@/lib/types";
import { useContext, useState } from "react";
import styled from "styled-components";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import CopyFieldSlider from "../CopyFieldSlider/CopyFieldSlider";
import SpecificCombinationList from "../SpecificCombinationList/SpecificCombinationList";
import { ActionContext } from "../Layout/Layout";

type Props = {
  colorObject?: ColorObject;
  combinations?: {
    id: number;
    colors: ColorObject[];
  }[];
};

export function ColorDetail({ colorObject, combinations }: Props) {
  const actionContext = useContext(ActionContext);

  if (!actionContext || !colorObject || !combinations)
    return <h1>Loading...</h1>;

  const { name, hex, rgb, swatch, isBright } = colorObject;

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
          isBright={isBright}
          isFavorite={favoriteStatus !== -1}
        />

        <StyledHeadline $isBright={isBright}>{name}</StyledHeadline>

        <CopyFieldSlider
          isLargeCombination
          color={colorObject}
          needColorName={false}
        />
      </StyledColorBox>

      <SpecificCombinationList combinations={combinations} />
    </PageContainer>
  );
}

const PageContainer = styled.main`
  margin-top: 120px;
  @media screen and (min-width: 1024px), screen and (orientation: landscape) {
    width: 70%;
    margin-left: 30%;
    margin-top: 60px;
  }
`;

const StyledColorBox = styled.header<{ $hex: string }>`
  position: relative;
  height: 250px;
  width: 100%;
  display: flex;
  padding: 40px 0 0 0;
  align-items: center;
  flex-direction: column;
  overflow-x: hidden;
  background-color: ${({ $hex }) => $hex};
`;

const StyledHeadline = styled.h1<{ $isBright: boolean }>`
  color: ${({ $isBright }) => ($isBright ? "black" : "white")};
  font-size: 1.5rem;
  font-weight: lighter;
`;
