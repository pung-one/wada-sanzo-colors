"use client";

import ColorsList from "@/components/ColorsList/ColorsList";
import CombinationsList from "@/components/CombinationsList/CombinationsList";
import { ColorObject } from "@/lib/types";
import { useContext } from "react";
import styled from "styled-components";
import { ActionContext } from "../Layout/Layout";
import { createCombinationArray } from "@/utils/helper";
import { useFavorites } from "../FavoritesProvider/FavoritesProvider";

type Props = {
  colors: ColorObject[];
};

export function Favorites({ colors }: Props) {
  const { favoriteCombinations, favoriteColors } = useFavorites();

  const actionContext = useContext(ActionContext);

  if (!actionContext) return <h1>Loading...</h1>;

  const { listType } = actionContext;

  const favoriteColorsList = colors.filter((color1) =>
    favoriteColors
      ?.filter((color) => color.isFavorite)
      .some((color2) => color2.name === color1.name)
  );

  const allCombinationsArray = createCombinationArray(colors);

  const favoriteCombinationsList = allCombinationsArray?.filter(
    (combination1) =>
      favoriteCombinations
        ?.filter((combination) => combination.isFavorite)
        .some((combination2) => combination2.id === combination1.id)
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
  margin: 0 0 20px;
  @media screen and (min-width: 1024px), screen and (orientation: landscape) {
    width: 70%;
    margin-left: 30%;
  }
`;

const NoFavoritesInfo = styled.p`
  padding-top: 350px;
  font-size: 1.5rem;
  text-align: center;
`;
