import styled, { css } from "styled-components";
import { TfiArrowDown } from "react-icons/tfi";
import { useContext, useEffect, useRef, useState } from "react";
import { ActionContext } from "../Layout/Layout";
import FavoriteMessage from "../FavoriteMessage/FavoriteMessage";

type Props = {
  type: "combi" | "color";
  isFavorite: boolean;
  elementId: number | string;
  isOnListElement?: boolean;
  isOnDetailColor?: boolean;
  isOnDetailCombination?: boolean;
  isBright: boolean;
};

export default function FavoriteButton({
  type,
  elementId,
  isFavorite,
  isOnListElement = false,
  isOnDetailColor = false,
  isOnDetailCombination = false,
  isBright,
}: Props) {
  const [favMessageId, setFavMessageId] = useState<string | number>("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const actionContext = useContext(ActionContext);

  async function handleToggleFavorite() {
    setFavMessageId(elementId);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => setFavMessageId("false"), 1000);

    if (type === "color") {
      const stored = actionContext?.favoriteColorsData || [];

      const index = stored.findIndex((c) => c.name === elementId);

      if (index !== -1) {
        stored[index].isFavorite = !stored[index].isFavorite;
      } else {
        stored.push({ name: elementId as string, isFavorite: true });
      }

      actionContext?.setFavoriteColorsData(stored);
    } else {
      const stored = actionContext?.favoriteCombinationsData || [];

      const index = stored.findIndex((c) => c.id === elementId);

      if (index !== -1) {
        stored[index].isFavorite = !stored[index].isFavorite;
      } else {
        stored.push({ id: elementId as number, isFavorite: true });
      }

      actionContext?.setFavoriteCombinationsData(stored);
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
  font-size: 1.7vh;
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
  width: 3.5vh;
  height: 3.5vh;
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
      top: 19%;
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
      font-size: 2.2vh;
    }
  }
  transition: all 0.2s;
`;
