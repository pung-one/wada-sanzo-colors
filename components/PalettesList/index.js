import styled from "styled-components";
import Link from "next/link";
import FavoriteButton from "../FavoriteButton";
import { IsColorBright } from "@/utils/IsColorBright";
import { useEffect, useState } from "react";
import FavoriteMessage from "../FavoriteMessage";

const List = styled.ul`
  padding: 0;
  list-style-type: 0;
  width: 100vw;
`;

const StyledPaletteContainer = styled.li`
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

const StyledPaletteNumber = styled.span`
  position: absolute;
  font-size: 2.5vh;
  padding: 2vh;
  text-decoration: underline;
  color: ${({ isBright }) => (isBright ? "black" : "white")};
`;

export default function PalettesList({
  paletteArray,
  favoritePalettesData,
  onToggleFavorite,
  paletteListType,
}) {
  const [showFavMessage, setShowFavMessage] = useState(false);
  const [favMessageId, setFavMessageId] = useState("");
  const [arrayToBeRendered, setArrayToBeRendered] = useState(null);
  useEffect(() => {
    if (paletteListType === 0) {
      setArrayToBeRendered(paletteArray);
    } else if (paletteListType === 2) {
      setArrayToBeRendered(
        paletteArray.filter((palette) => palette.palette.length === 2)
      );
    } else if (paletteListType === 3) {
      setArrayToBeRendered(
        paletteArray.filter((palette) => palette.palette.length === 3)
      );
    } else if (paletteListType === 4) {
      setArrayToBeRendered(
        paletteArray.filter((palette) => palette.palette.length === 4)
      );
    }
  }, [paletteListType, favoritePalettesData]);

  return (
    <List>
      {arrayToBeRendered?.map((palette1) => {
        const favoriteStatus = favoritePalettesData?.find(
          (palette2) => palette2.id === palette1.id
        );
        function handleShowFavMessage(toggleValue) {
          setShowFavMessage(true);
          setFavMessageId(toggleValue);
          const timer = setTimeout(() => setShowFavMessage(false), 1000);
        }
        return (
          <StyledPaletteContainer
            key={palette1.id}
            length={palette1?.palette?.length}
          >
            <FavoriteMessage
              isFavorite={favoriteStatus?.isFavorite}
              showFavMessage={showFavMessage}
              isTriggered={palette1.id === favMessageId}
            />
            {palette1.palette?.map(({ name, hex, rgb }, colorIndex) => {
              return (
                <StyledColorBox key={name} hex={hex}>
                  {colorIndex === 0 && (
                    <Link href={`/palettes/${palette1.id}`}>
                      <StyledPaletteNumber isBright={IsColorBright(rgb)}>
                        {palette1.id}
                      </StyledPaletteNumber>
                    </Link>
                  )}
                  <FavoriteButton
                    isFavorite={favoriteStatus?.isFavorite}
                    isOnListElement={true}
                    isBright={IsColorBright(rgb)}
                    toggleValue={palette1.id}
                    onToggleFavorite={onToggleFavorite}
                    onShowFavMessage={handleShowFavMessage}
                  />
                </StyledColorBox>
              );
            })}
          </StyledPaletteContainer>
        );
      })}
    </List>
  );
}
