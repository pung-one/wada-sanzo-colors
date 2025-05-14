"use client";

import Link from "next/link";
import styled from "styled-components";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { useState, useEffect, useContext } from "react";
import { ColorObject } from "@/lib/types";
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
    <List>
      {arrayToBeRendered?.map(({ name, slug, isBright, hex, swatch }) => {
        const favoriteStatus = favoriteColorsData?.findIndex(
          (color) => color.name === name && color.isFavorite
        );

        return (
          <ColorBox key={name} $isBright={isBright} $hex={hex}>
            <FavoriteButton
              type="color"
              elementId={name}
              swatch={swatch}
              isBright={isBright}
              isFavorite={favoriteStatus !== -1}
              isOnListElement={true}
            />
            <Link aria-label={`got to color ${name}`} href={`/colors/${slug}`}>
              <StyledColorName $isBright={isBright}>{name}</StyledColorName>
            </Link>
          </ColorBox>
        );
      })}
    </List>
  );
}

const List = styled.ul`
  padding-top: 290px;
  @media screen and (min-width: 1024px), screen and (orientation: landscape) {
    padding-top: 160px;
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
  width: 100%;
  margin-top: 20px;
  height: 200px;
  overflow-x: hidden;
  background-color: ${({ $hex }) => $hex};
  color: ${({ $isBright }) => ($isBright ? "black" : "white")};
`;

const StyledColorName = styled.p<{
  $isBright: boolean;
}>`
  position: absolute;
  left: 0;
  font-size: 1rem;
  font-weight: lighter;
  padding: 20px;
  text-decoration: underline;
  color: ${({ $isBright }) => ($isBright ? "black" : "white")};
`;
