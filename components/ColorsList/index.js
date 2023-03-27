import Link from "next/link";
import styled from "styled-components";
import { IsColorBright } from "@/utils/IsColorBright";
import FavoriteButton from "../FavoriteButton";
import { useState, useEffect } from "react";
import FavoriteMessage from "../FavoriteMessage";

const List = styled.ul`
  padding-top: 32.5vh;
  list-style: none;
  list-style-type: 0;
  width: 100vw;
`;

const ColorBox = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 25vh;
  margin-top: 2vh;
  line-height: 25vh;
  overflow-x: hidden;
  background-color: ${({ hex }) => (hex ? hex : null)};
  color: ${({ isBright }) => (isBright ? "black" : "white")};
`;

const StyledColorName = styled.p`
  text-align: center;
  font-size: 2.5vh;
  font-weight: lighter;
  color: ${({ isBright }) => (isBright ? "black" : "white")};
`;

export default function ColorsList({
  colors,
  favoriteColorsData,
  onToggleFavorite,
  colorListType,
}) {
  const [showFavMessage, setShowFavMessage] = useState(false);
  const [favMessageName, setFavMessageName] = useState("");
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
      {arrayToBeRendered?.map(({ name, slug, rgb, hex, swatch }) => {
        const favoriteStatus = favoriteColorsData?.find(
          (color) => color.name === name
        );

        function handleShowFavMessage(toggleValue) {
          setShowFavMessage(true);
          setFavMessageName(toggleValue);
          const timer = setTimeout(() => setShowFavMessage(false), 1000);
        }

        const isBright = IsColorBright(rgb);
        return (
          <ColorBox key={name} isBright={isBright} hex={hex}>
            <FavoriteMessage
              isFavorite={favoriteStatus?.isFavorite}
              showFavMessage={showFavMessage}
              isTriggered={name === favMessageName}
            />
            <FavoriteButton
              isBright={isBright}
              isFavorite={favoriteStatus?.isFavorite}
              isOnListElement={true}
              toggleValue={name}
              onToggleFavorite={onToggleFavorite}
              onShowFavMessage={handleShowFavMessage}
              swatch={swatch}
            />
            <Link aria-label={`got to color ${name}`} href={`/colors/${slug}`}>
              <StyledColorName isBright={isBright}>{name}</StyledColorName>
            </Link>
          </ColorBox>
        );
      })}
    </List>
  );
}
