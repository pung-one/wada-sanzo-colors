"use client";

import styled from "styled-components";
import ColorsList from "@/components/ColorsList";
import CombinationsList from "@/components/CombinationsList";
import { useContext } from "react";
import { ActionContext } from "@/lib/actionsContext";
import { ColorObject, CombinationObject } from "@/lib/types";

type Props = {
  colorsWithSlug: ColorObject[];
  combinationArray: CombinationObject[];
};

export default function LandingPage({
  colorsWithSlug,
  combinationArray,
}: Props) {
  const actionContext = useContext(ActionContext);

  return (
    <PageContainer>
      {actionContext?.listType === "colors" ? (
        <ColorsList
          colors={colorsWithSlug}
          colorListType={actionContext?.colorListType}
          onToggleFavorite={actionContext?.onToggleFavoriteColor}
          favoriteColorsData={actionContext?.favoriteColorsData}
        />
      ) : (
        <CombinationsList
          combinationArray={combinationArray}
          combinationListType={actionContext?.combinationListType}
          onToggleFavorite={actionContext?.onToggleFavoriteCombination}
          favoriteCombinationsData={actionContext?.favoriteCombinationsData}
        />
      )}
    </PageContainer>
  );
}

const PageContainer = styled.main`
  position: relative;
  margin: 0 0 2vh;
  @media screen and (min-width: 1024px), screen and (orientation: landscape) {
    width: 70%;
    margin-left: 30%;
  }
`;
