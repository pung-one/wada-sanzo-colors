"use client";

import Link from "next/link";
import styled from "styled-components";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { useState, useEffect, useContext } from "react";
import { ColorObject } from "@/lib/types";
import { isColorBright } from "@/utils/helper";
import { ActionContext } from "../Layout/Layout";

type Props = {
  colors: ColorObject[];
};

export default function ColorsList({ colors }: Props) {
  const [arrayToBeRendered, setArrayToBeRendered] = useState<ColorObject[]>();

  const actionContext = useContext(ActionContext);

  if (!actionContext) return <h1>Loading...</h1>;

  const { colorListType, favoriteColorsData } = actionContext;

  useEffect(() => {
    if (colorListType === 0) {
      setArrayToBeRendered(colors);
    } else {
      setArrayToBeRendered(
        colors.filter((color) => color.swatch === colorListType - 1)
      );
    }
  }, [colorListType, favoriteColorsData]);

  return (
    <List key={favoriteColorsData.length}>
      {arrayToBeRendered?.map(({ name, slug, rgb, hex }) => {
        const favoriteStatus = favoriteColorsData?.some(
          (color) => color.name === name
        );

        return (
          <ColorBox key={name} $isBright={isColorBright(rgb)} $hex={hex}>
            <FavoriteButton
              type="color"
              elementId={name}
              isBright={isColorBright(rgb)}
              isFavorite={favoriteStatus}
              isOnListElement={true}
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
