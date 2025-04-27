"use client";

import styled from "styled-components";

type Props = {
  showFavMessage: boolean;
  isFavorite: boolean;
};

export default function FavoriteMessage({ showFavMessage, isFavorite }: Props) {
  return (
    <FavMessage $showFavMessage={showFavMessage}>
      {isFavorite ? "Removed from Favorites" : "Saved to Favorites"}
    </FavMessage>
  );
}

const FavMessage = styled.span<{
  $showFavMessage: boolean;
}>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 40%;
  width: 50%;
  height: 6vh;
  z-index: 4;
  background-color: white;
  border: 1px solid black;
  overflow: hidden;
  transform: ${({ $showFavMessage }) =>
    $showFavMessage ? "scale(1)" : "scale(0)"};
  transition: all 0.2s;
`;
