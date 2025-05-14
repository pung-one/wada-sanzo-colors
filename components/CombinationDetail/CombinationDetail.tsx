"use client";

import styled from "styled-components";
import { useState, useContext } from "react";
import CopyFieldSlider from "@/components/CopyFieldSlider/CopyFieldSlider";
import { CombinationObject } from "@/lib/types";
import { ActionContext } from "../Layout/Layout";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

export function CombinationDetail({
  combination,
}: {
  combination: CombinationObject;
}) {
  const actionContext = useContext(ActionContext);

  if (!actionContext) return <h1>Loading...</h1>;

  const isLargeCombination = combination.combination.length > 2;

  const favoriteStatus = actionContext.favoriteCombinationsData.findIndex(
    (comb) => comb.id == combination.id && comb.isFavorite
  );

  return (
    <PageContainer>
      <Heading>
        Combination #{combination.id}
        <FavoriteButton
          type="combi"
          elementId={combination.id}
          isFavorite={favoriteStatus !== -1}
          isBright={true}
          isOnDetailCombination={true}
        />
      </Heading>
      <CombinationContainer $isLarge={isLargeCombination}>
        {combination.combination.map((color, index) => {
          return (
            <ColorBox $hex={color.hex} key={color.name}>
              <CopyFieldSlider
                isLargeCombination={isLargeCombination}
                color={color}
                index={index}
                needColorName={true}
              />
            </ColorBox>
          );
        })}
      </CombinationContainer>
    </PageContainer>
  );
}

const PageContainer = styled.main`
  padding-top: 120px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 1024px), screen and (orientation: landscape) {
    padding-top: 60px;
    width: 70%;
    margin-left: 30%;
  }
`;

const Heading = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 20px;
  height: 75px;
  border-bottom: 1px solid black;
  font-size: 1.5rem;
  font-weight: lighter;
`;

const CombinationContainer = styled.div<{ $isLarge: boolean }>`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: ${({ $isLarge }) => ($isLarge ? "column" : null)};
  overflow-x: hidden;
`;

const ColorBox = styled.div<{ $hex: string }>`
  height: 100%;
  width: 100%;
  background-color: ${({ $hex }) => $hex};
`;
