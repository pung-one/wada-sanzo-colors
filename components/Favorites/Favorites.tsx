"use client";

import ColorsList from "@/components/ColorsList/ColorsList";
import CombinationsList from "@/components/CombinationsList/CombinationsList";
import { ColorObject, CombinationObject } from "@/lib/types";
import { useContext } from "react";
import styled from "styled-components";
import { ActionContext } from "../Layout/Layout";
import { createCombinationArray } from "@/utils/helper";

type Props = {
  colors: ColorObject[];
};

export function Favorites({ colors }: Props) {
  const actionContext = useContext(ActionContext);

  if (!actionContext) return <h1>Loading...</h1>;

  const {
    favoriteColorsData,
    favoriteCombinationsData,
    onToggleFavoriteColor,
    listType,
  } = actionContext;

  const favoriteColors = favoriteColorsData?.filter(
    (color) => color.isFavorite
  );
  const favoriteColorsList = colors.filter((color1) =>
    favoriteColors?.some((color2) => color2.name === color1.name)
  );

  const allCombinationsArray = createCombinationArray(colors);
  const favoriteCombinations = favoriteCombinationsData?.filter(
    (combination) => combination.isFavorite
  );
  const favoriteCombinationsList = allCombinationsArray?.filter(
    (combination1) =>
      favoriteCombinations?.some(
        (combination2) => combination2.id === combination1.id
      )
  );

  return (
    <PageContainer>
      {favoriteColorsList.length === 0 && listType === "colors" && (
        <NoFavoritesInfo>No favorite colors.</NoFavoritesInfo>
      )}
      {favoriteCombinationsList.length === 0 && listType === "combinations" && (
        <NoFavoritesInfo>No favorite combinations.</NoFavoritesInfo>
      )}
      {listType === "colors" && <ColorsList colors={favoriteColorsList} />}
      {listType === "combinations" && (
        <CombinationsList combinations={favoriteCombinationsList} />
      )}
    </PageContainer>
  );
}

const PageContainer = styled.main`
  margin: 0 0 2vh;
  @media screen and (min-width: 1024px), screen and (orientation: landscape) {
    width: 70%;
    margin-left: 30%;
  }
`;

const NoFavoritesInfo = styled.p`
  padding-top: 50vh;
  font-size: 3vh;
  text-align: center;
`;
