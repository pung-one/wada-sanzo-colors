"use client";

import styled from "styled-components";

type Props = {
  showFavMessage: boolean;
  isFavorite: boolean;
};

export default function FavoriteMessage({ showFavMessage, isFavorite }: Props) {
  return (
    <FavMessage $showFavMessage={showFavMessage}>
      {isFavorite ? "Saved to Favorites" : "Removed from Favorites"}
    </FavMessage>
  );
}

const FavMessage = styled.span<{
  $showFavMessage: boolean;
}>`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 40%;
  right: 50%;
  padding: 10px;
  font-size: 0.8rem;
  z-index: 10;
  background-color: white;
  border: 1px solid black;
  overflow: hidden;
  transform: ${({ $showFavMessage }) =>
    $showFavMessage ? "translateX(50%) scale(1)" : "translateX(50%) scale(0)"};
  transition: all 0.2s;
`;
