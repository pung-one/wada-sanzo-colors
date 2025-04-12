import styled, { css } from "styled-components";
import Link from "next/link";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { IsColorBright } from "@/utils/IsColorBright/index.js";
import { useEffect, useState } from "react";
import FavoriteMessage from "../FavoriteMessage";

export default function CombinationsList({
  combinationArray,
  favoriteCombinationsData,
  onToggleFavorite,
  combinationListType,
}) {
  const [showFavMessage, setShowFavMessage] = useState(false);
  const [favMessageId, setFavMessageId] = useState("");
  const [arrayToBeRendered, setArrayToBeRendered] = useState(null);
  useEffect(() => {
    if (combinationListType === 0) {
      setArrayToBeRendered(combinationArray);
    } else if (combinationListType === 2) {
      setArrayToBeRendered(
        combinationArray.filter(
          (combination) => combination.combination.length === 2
        )
      );
    } else if (combinationListType === 3) {
      setArrayToBeRendered(
        combinationArray.filter(
          (combination) => combination.combination.length === 3
        )
      );
    } else if (combinationListType === 4) {
      setArrayToBeRendered(
        combinationArray.filter(
          (combination) => combination.combination.length === 4
        )
      );
    }
  }, [combinationListType, favoriteCombinationsData]);

  return (
    <List>
      {arrayToBeRendered?.map((combination1) => {
        const favoriteStatus = favoriteCombinationsData?.find(
          (combination2) => combination2.id === combination1.id
        );
        function handleShowFavMessage(toggleValue) {
          setShowFavMessage(true);
          setFavMessageId(toggleValue);
          const timer = setTimeout(() => setShowFavMessage(false), 1000);
        }
        return (
          <StyledCombinationContainer
            key={combination1.id}
            length={combination1?.combination?.length}
          >
            <FavoriteMessage
              isFavorite={favoriteStatus?.isFavorite}
              showFavMessage={showFavMessage}
              isTriggered={combination1.id === favMessageId}
            />
            {combination1.combination?.map(
              ({ name, hex, rgb }, colorIndex, array) => {
                return (
                  <StyledColorBox key={name} hex={hex}>
                    {colorIndex === 0 && (
                      <Link href={`/combinations/${combination1.id}`}>
                        <StyledCombinationNumber
                          isBright={IsColorBright(rgb)}
                          isOnLargeCombination={array.length > 3}
                        >
                          {`Combi #${combination1.id}`}
                        </StyledCombinationNumber>
                      </Link>
                    )}
                    <FavoriteButton
                      isFavorite={favoriteStatus?.isFavorite}
                      isOnListElement={true}
                      isBright={IsColorBright(rgb)}
                      toggleValue={combination1.id}
                      onToggleFavorite={onToggleFavorite}
                      onShowFavMessage={handleShowFavMessage}
                    />
                  </StyledColorBox>
                );
              }
            )}
          </StyledCombinationContainer>
        );
      })}
    </List>
  );
}

const List = styled.ul`
  padding-top: 33.5vh;
  list-style-type: 0;
  @media screen and (min-width: 1024px), screen and (orientation: landscape) {
    padding-top: 16.5vh;
  }
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
  padding: 2vh 0 0 3vh;
  text-decoration: underline;
  color: ${({ isBright }) => (isBright ? "black" : "white")};
  ${(props) =>
    props.isOnLargeCombination
      ? css`
          max-width: 23vw;
          overflow-wrap: break-word;
        `
      : null}
`;
