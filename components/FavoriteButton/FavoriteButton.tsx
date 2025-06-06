import styled, { css } from "styled-components";
import { TfiArrowDown } from "react-icons/tfi";
import { useEffect, useRef, useState } from "react";
import FavoriteMessage from "../FavoriteMessage/FavoriteMessage";
import { useFavorites } from "../FavoritesProvider/FavoritesProvider";

type Props = {
  type: "combi" | "color";
  isFavorite: boolean;
  elementId: number | string;
  swatch?: number;
  isOnListElement?: boolean;
  isOnDetailColor?: boolean;
  isOnDetailCombination?: boolean;
  isBright: boolean;
};

export default function FavoriteButton({
  type,
  elementId,
  swatch,
  isFavorite,
  isOnListElement = false,
  isOnDetailColor = false,
  isOnDetailCombination = false,
  isBright,
}: Props) {
  const [favMessageId, setFavMessageId] = useState<string | number>("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { toggleFavoriteColor, toggleFavoriteCombination } = useFavorites();

  async function handleToggleFavorite() {
    setFavMessageId(elementId);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => setFavMessageId("false"), 1000);

    if (type === "color") {
      toggleFavoriteColor(elementId as string, swatch as number);
    } else {
      toggleFavoriteCombination(elementId as number);
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <FavoriteMessage
        isFavorite={isFavorite}
        showFavMessage={favMessageId === elementId}
      />

      <Button
        $isFavorite={isFavorite}
        $isBright={isBright}
        $isOnList={isOnListElement}
        $isOnColor={isOnDetailColor}
        $isOnCombination={isOnDetailCombination}
        onClick={handleToggleFavorite}
        aria-label={"favor or defavor a color or combination"}
      >
        <Arrow $isFavorite={isFavorite} $isBright={isBright} />
      </Button>
    </>
  );
}

const Arrow = styled(TfiArrowDown)<{
  $isFavorite: boolean;
  $isBright: boolean;
}>`
  fill: ${(props) =>
    props.$isFavorite && props.$isBright
      ? "white"
      : props.$isFavorite && !props.$isBright
      ? "black"
      : !props.$isFavorite && !props.$isBright
      ? "white"
      : null};
  transform: ${(props) => (props.$isFavorite ? "rotateX(180deg)" : null)};
  transition: all 0.2s;
`;

const Button = styled.button<{
  $isFavorite: boolean;
  $isBright: boolean;
  $isOnList: boolean;
  $isOnColor: boolean;
  $isOnCombination: boolean;
}>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background-color: ${({ $isFavorite, $isBright }) =>
    $isFavorite && $isBright
      ? "black"
      : $isFavorite && !$isBright
      ? "white"
      : "transparent"};
  border: ${({ $isBright }) =>
    $isBright ? "1px solid black" : "1px solid white"};
  border-radius: 50%;
  ${(props) =>
    props.$isOnList &&
    css`
      right: 4%;
      top: 10%;
    `}
  ${(props) =>
    props.$isOnColor &&
    css`
      right: 6%;
      top: 16%;
    `};
  ${(props) =>
    props.$isOnCombination &&
    css`
      right: 8%;
      top: 36%;
    `}
  &:hover {
    cursor: pointer;
    ${Arrow} {
      transform: scale(1.1);
    }
  }
  transition: all 0.2s;
`;
