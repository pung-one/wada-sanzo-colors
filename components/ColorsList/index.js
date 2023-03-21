import Link from "next/link";
import styled from "styled-components";
import { IsColorBright } from "@/utils/IsColorBright";
import FavoriteButton from "../FavoriteButton";
import { useState, useEffect } from "react";

const List = styled.ul`
  padding: 0;
  list-style: none;
  list-style-type: 0;
`;

const ColorBox = styled.li`
  position: relative;
  height: 25vh;
  margin-top: 2vh;
  line-height: 25vh;
  background-color: ${({ hex }) => (hex ? hex : null)};
  color: ${({ isBright }) => (isBright ? "black" : "white")};
`;

const StyledColorName = styled.p`
  text-align: center;
  color: ${({ isBright }) => (isBright ? "black" : "white")};
`;

export default function ColorsList({
  colors,
  favoriteColorsData,
  onToggleFavorite,
  colorListType,
}) {
  console.log(colors);
  const [arrayToBeRendered, setArrayToBeRendered] = useState(null);
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
      {arrayToBeRendered?.map(({ name, slug, rgb, hex }) => {
        const favoriteStatus = favoriteColorsData?.find(
          (color) => color.name === name
        );
        return (
          <ColorBox key={name} isBright={IsColorBright(rgb)} hex={hex}>
            <FavoriteButton
              isBright={IsColorBright(rgb)}
              isFavorite={favoriteStatus?.isFavorite}
              isOnListElement={true}
              toggleValue={name}
              onToggleFavorite={onToggleFavorite}
            />
            <Link aria-label={`got to color ${name}`} href={`/colors/${slug}`}>
              <StyledColorName isBright={IsColorBright(rgb)}>
                {name}
              </StyledColorName>
            </Link>
          </ColorBox>
        );
      })}
    </List>
  );
}
