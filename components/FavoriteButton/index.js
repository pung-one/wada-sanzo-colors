import styled, { css } from "styled-components";

const Button = styled.button`
  position: absolute;
  width: 3vh;
  height: 3vh;
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
    props.isOnPalette &&
    css`
      right: 8%;
      top: 36%;
    `}
  &:hover {
    cursor: pointer;
  }
`;

export default function FavoriteButton({
  isFavorite,
  isOnListElement,
  isOnDetailColor,
  isOnDetailPalette,
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
      isOnPalette={isOnDetailPalette}
      isBright={isBright}
      onClick={() => {
        onToggleFavorite(toggleValue, swatch);
        onShowFavMessage(toggleValue);
      }}
      aria-label={"favor or defavor a color or combination"}
    />
  );
}
