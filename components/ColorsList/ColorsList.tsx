"use client";

import Link from "next/link";
import styled from "styled-components";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { useState, useEffect, useContext } from "react";
import FavoriteMessage from "../FavoriteMessage/FavoriteMessage";
import { ColorObject } from "@/lib/types";
import { isColorBright } from "@/utils/helper";
import { ActionContext } from "../Layout/Layout";

type Props = {
  colors: ColorObject[];
};

export default function ColorsList({ colors }: Props) {
  const [showFavMessage, setShowFavMessage] = useState(false);
  const [favMessageName, setFavMessageName] = useState("");
  const [arrayToBeRendered, setArrayToBeRendered] = useState<ColorObject[]>();

  const actionContext = useContext(ActionContext);

  if (!actionContext) return <h1>Loading...</h1>;

  const { colorListType, favoriteColorsData, onToggleFavoriteColor } =
    actionContext;

  useEffect(() => {
    if (colorListType === 0) {
      setArrayToBeRendered(colors);
    } else if (colorListType === 1) {
      setArrayToBeRendered(colors.filter((color) => color.swatch === 0));
    } else if (colorListType === 2) {
      setArrayToBeRendered(colors.filter((color) => color.swatch === 1));
    } else if (colorListType === 3) {
      setArrayToBeRendered(colors.filter((color) => color.swatch === 2));
    } else if (colorListType === 4) {
      setArrayToBeRendered(colors.filter((color) => color.swatch === 3));
    } else if (colorListType === 5) {
      setArrayToBeRendered(colors.filter((color) => color.swatch === 4));
    } else if (colorListType === 6) {
      setArrayToBeRendered(colors.filter((color) => color.swatch === 5));
    }
  }, [colorListType, favoriteColorsData]);

  return (
    <List>
      {arrayToBeRendered?.map(({ name, slug, rgb, hex, swatch }) => {
        const favoriteStatus = favoriteColorsData?.some(
          (color) => color.name === name
        );

        function handleShowFavMessage(toggleValue: string) {
          setShowFavMessage(true);
          setFavMessageName(toggleValue);
          const timer = setTimeout(() => setShowFavMessage(false), 1000);
        }

        return (
          <ColorBox key={name} $isBright={isColorBright(rgb)} $hex={hex}>
            <FavoriteMessage
              isFavorite={favoriteStatus}
              showFavMessage={showFavMessage}
              isTriggered={name === favMessageName}
            />
            <FavoriteButton
              isBright={isColorBright(rgb)}
              isFavorite={favoriteStatus}
              isOnListElement={true}
              onToggleFavorite={() =>
                actionContext.onToggleFavoriteColor(name, swatch)
              }
              onShowFavMessage={() => handleShowFavMessage(name)}
            />
            <Link aria-label={`got to color ${name}`} href={`/colors/${slug}`}>
              <StyledColorName $isBright={isColorBright(rgb)}>
                {name}
              </StyledColorName>
            </Link>
          </ColorBox>
        );
      })}
    </List>
  );
}

const List = styled.ul`
  padding-top: 42.5vh;
  list-style: none;
  list-style-type: 0;
  @media screen and (min-width: 1024px), screen and (orientation: landscape) {
    padding-top: 18.5vh;
  }
`;

const ColorBox = styled.li<{
  $hex: string;
  $isBright: boolean;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 25vh;
  margin-top: 2vh;
  overflow-x: hidden;
  background-color: ${({ $hex }) => $hex};
  color: ${({ $isBright }) => ($isBright ? "black" : "white")};
`;

const StyledColorName = styled.p<{
  $isBright: boolean;
}>`
  position: absolute;
  left: 0;
  font-size: 2.5vh;
  font-weight: lighter;
  padding: 2vh 0 0 3vh;
  text-decoration: underline;
  color: ${({ $isBright }) => ($isBright ? "black" : "white")};
`;
