import styled from "styled-components";

const FavMessage = styled.span`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 40%;
  width: 50vw;
  height: 6vh;
  z-index: 5;
  background-color: white;
  border: 1px solid black;
  overflow: hidden;
  transform: ${({ showFavMessage, isTriggered }) =>
    showFavMessage && isTriggered ? "scale(1)" : "scale(0)"};
  transition: all 0.2s;
`;

export default function FavoriteMessage({
  showFavMessage,
  isFavorite,
  isTriggered,
}) {
  return (
    <FavMessage showFavMessage={showFavMessage} isTriggered={isTriggered}>
      {isFavorite ? <p>Saved to Favorites</p> : <p>Removed from Favorites</p>}
    </FavMessage>
  );
}
