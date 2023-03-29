import styled from "styled-components";
import Link from "next/link";
import FavoriteButton from "../FavoriteButton";
import { IsColorBright } from "@/utils/IsColorBright/index.js";
import { useState } from "react";
import FavoriteMessage from "../FavoriteMessage";

export default function SpecificCombinationList({
  colors,
  currentColor,
  favoriteCombinationsData,
  onToggleFavoriteCombination,
}) {
  const [showFavMessage, setShowFavMessage] = useState(false);
  const [favMessageId, setFavMessageId] = useState("");
  return (
    <List>
      {currentColor?.combinations.map((combi1) => {
        const favoriteStatus = favoriteCombinationsData?.find(
          (combination) => combination.id === combi1
        );
        const combination = colors.filter((color) =>
          color.combinations.some((combi2) => combi1 === combi2)
        );
        function handleShowFavMessage(toggleValue) {
          setShowFavMessage(true);
          setFavMessageId(toggleValue);
          const timer = setTimeout(() => setShowFavMessage(false), 1000);
        }
        return (
          <StyledCombinationContainer key={combi1}>
            <FavoriteMessage
              isFavorite={favoriteStatus?.isFavorite}
              showFavMessage={showFavMessage}
              isTriggered={combi1 === favMessageId}
            />
            {combination.map(({ name, hex, rgb }, colorIndex) => {
              return (
                <StyledColorBox key={name} hex={hex}>
                  {colorIndex === 0 && (
                    <Link
                      aria-label={`go to color-combination with nr ${combi1}`}
                      href={`/combinations/${combi1}`}
                    >
                      <StyledCombinationNumber isBright={IsColorBright(rgb)}>
                        {combi1}
                      </StyledCombinationNumber>
                    </Link>
                  )}
                  <FavoriteButton
                    isFavorite={favoriteStatus?.isFavorite}
                    isOnListElement={true}
                    isBright={IsColorBright(rgb)}
                    toggleValue={combi1}
                    onToggleFavorite={onToggleFavoriteCombination}
                    onShowFavMessage={handleShowFavMessage}
                  />
                </StyledColorBox>
              );
            })}
          </StyledCombinationContainer>
        );
      })}
    </List>
  );
}

const List = styled.ul`
  padding: 0;
  list-style: none;
  list-style-type: 0;
`;

const StyledCombinationContainer = styled.li`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 2vh;
  height: 25vh;
`;

const StyledColorBox = styled.div`
  flex: 1;
  display: flex;
  background-color: ${({ hex }) => (hex ? hex : null)};
`;

const StyledCombinationNumber = styled.span`
  position: absolute;
  font-size: 2.5vh;
  font-weight: lighter;
  padding: 2vh;
  text-decoration: underline;
  color: ${({ isBright }) => (isBright ? "black" : "white")};
`;
