import styled, { css } from "styled-components";
import { TfiArrowDown } from "react-icons/tfi";

export default function FavoriteButton({
  isFavorite,
  isOnListElement,
  isOnDetailColor,
  isOnDetailCombination,
  isBright,
  toggleValue,
  onToggleFavorite,
  onShowFavMessage,
  swatch,
}) {
  return (
    <Button
      isFavorite={isFavorite}
      isOnList={isOnListElement}
      isOnColor={isOnDetailColor}
      isOnCombination={isOnDetailCombination}
      isBright={isBright}
      onClick={() => {
        onToggleFavorite(toggleValue, swatch);
        onShowFavMessage(toggleValue);
      }}
      aria-label={"favor or defavor a color or combination"}
    >
      <Arrow $isFavorite={isFavorite} $isBright={isBright} />
    </Button>
  );
}

const Arrow = styled(TfiArrowDown)`
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

const Button = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.5vh;
  height: 3.5vh;
  background-color: ${({ isFavorite, isBright }) =>
    isFavorite && isBright
      ? "black"
      : isFavorite && !isBright
      ? "white"
      : "transparent"};
  border: ${({ isBright }) =>
    isBright ? "1px solid black" : "1px solid white"};
  border-radius: 50%;
  ${(props) =>
    props.isOnList &&
    css`
      right: 4%;
      top: 10%;
    `}
  ${(props) =>
    props.isOnColor &&
    css`
      right: 6%;
      top: 19%;
    `};
  ${(props) =>
    props.isOnCombination &&
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
