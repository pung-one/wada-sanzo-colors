"use client";

import { ColorObject } from "@/lib/types";
import { useContext, useState } from "react";
import styled from "styled-components";
import FavoriteButton from "../FavoriteButton";
import { IsColorBright } from "@/utils/IsColorBright";
import FavoriteMessage from "../FavoriteMessage";
import { ActionContext } from "@/lib/actionsContext";
import CopyFieldSlider from "../CopyFieldSlider/CopyFieldSlider";

type Props = {
  colorObject: ColorObject;
};

export function ColorDetail({ colorObject }: Props) {
  const { name, hex, rgb, swatch } = colorObject;

  const [isActive, setIsActive] = useState(false);
  const [showFavMessage, setShowFavMessage] = useState(false);
  const [favMessageName, setFavMessageName] = useState("");

  const actionContext = useContext(ActionContext);

  if (!actionContext) return <h1>Loading...</h1>;

  function handleSlide() {
    setIsActive(!isActive);
  }

  function handleShowFavMessage(toggleValue: string) {
    setShowFavMessage(true);
    setFavMessageName(toggleValue);
    const timer = setTimeout(() => setShowFavMessage(false), 1000);
  }

  const favoriteStatus = actionContext.favoriteColorsData.find(
    (color) => color.name === name
  );

  return (
    <PageContainer>
      <StyledColorBox $hex={hex}>
        <FavoriteMessage
          isFavorite={favoriteStatus?.isFavorite}
          showFavMessage={showFavMessage}
          isTriggered={name === favMessageName}
        />
        <FavoriteButton
          isOnDetailColor
          isBright={IsColorBright(rgb)}
          isFavorite={favoriteStatus?.isFavorite}
          onToggleFavorite={() =>
            actionContext.onToggleFavoriteColor(name, swatch)
          }
          onShowFavMessage={() => handleShowFavMessage(name)}
        />

        <StyledHeadline $isBright={IsColorBright(rgb)}>{name}</StyledHeadline>

        <CopyFieldSlider
          isLargeCombination
          color={colorObject}
          isActive={isActive}
          handleSlide={handleSlide}
          needColorName={false}
        />
      </StyledColorBox>

      <SpecificCombinationList
        currentColor={colorObject}
        colors={data}
        favoriteCombinationsData={favoriteCombinationsData}
        onToggleFavoriteCombination={onToggleFavoriteCombination}
      />
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
