"use client";

import styled from "styled-components";
import { useState, useContext } from "react";
import CopyFieldSlider from "@/components/CopyFieldSlider/CopyFieldSlider";
import FavoriteMessage from "@/components/FavoriteMessage/FavoriteMessage";
import { CombinationObject } from "@/lib/types";
import { ActionContext } from "../Layout/Layout";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

export function CombinationDetail({
  combination,
}: {
  combination: CombinationObject;
}) {
  const [showFavMessage, setShowFavMessage] = useState<boolean>(false);
  const [favMessageId, setFavMessageId] = useState<number>();
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const actionContext = useContext(ActionContext);

  if (!actionContext) return <h1>Loading...</h1>;

  const isLargeCombination = combination.combination.length > 2;

  const handleSlide = (index: number) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  const favoriteStatus = actionContext.favoriteCombinationsData.some(
    (comb) => comb.id == combination.id
  );
  function handleShowFavMessage(toggleValue: number) {
    setShowFavMessage(true);
    setFavMessageId(toggleValue);
    const timer = setTimeout(() => setShowFavMessage(false), 1000);
  }
  return (
    <PageContainer>
      <FavoriteMessage
        isFavorite={favoriteStatus}
        showFavMessage={showFavMessage}
        isTriggered={combination.id == favMessageId}
      />
      <Heading>
        <FavoriteButton
          type="combi"
          elementId={combination.id}
          isFavorite={favoriteStatus}
          isBright={true}
          isOnDetailCombination={true}
          onShowFavMessage={() => handleShowFavMessage(combination.id)}
        />
        Combination #{combination.id}
      </Heading>
      <CombinationContainer $isLarge={isLargeCombination}>
        {combination.combination.map((color, index) => {
          return (
            <ColorBox $hex={color.hex} key={color.name}>
              <CopyFieldSlider
                isLargeCombination={isLargeCombination}
                color={color}
                index={index}
                onHandleSlide={() => handleSlide(index)}
                isActive={index === activeIndex}
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
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15.5vh;
  height: 84.5vh;
  @media screen and (min-width: 1024px), screen and (orientation: landscape) {
    width: 70%;
    margin: 6.5vh 0 0 30%;
    height: 93.5vh;
  }
`;

const Heading = styled.header`
  position: relative;
  width: 100%;
  padding: 3vh;
  height: 11vh;
  border-bottom: 1px solid black;
  font-size: 4vh;
  font-weight: lighter;
`;

const CombinationContainer = styled.div<{ $isLarge: boolean }>`
  display: flex;
  height: 84.5vh;
  width: 100%;
  flex-direction: ${({ $isLarge }) => ($isLarge ? "column" : null)};
  overflow-x: hidden;
`;

const ColorBox = styled.div<{ $hex: string }>`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ $hex }) => $hex};
`;
