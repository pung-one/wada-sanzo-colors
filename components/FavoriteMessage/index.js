import styled from "styled-components";

export default function FavoriteMessage({
  showFavMessage,
  isFavorite,
  isTriggered,
}) {
  return (
    <FavMessage showFavMessage={showFavMessage} isTriggered={isTriggered}>
      {isFavorite ? "Saved to Favorites" : "Removed from Favorites"}
    </FavMessage>
  );
}

const FavMessage = styled.span`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 40%;
  width: 50vw;
  height: 6vh;
  z-index: 4;
  background-color: white;
  border: 1px solid black;
  overflow: hidden;
  transform: ${({ showFavMessage, isTriggered }) =>
    showFavMessage && isTriggered ? "scale(1)" : "scale(0)"};
  transition: all 0.2s;
`;
