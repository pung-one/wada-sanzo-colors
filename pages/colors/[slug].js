import { useRouter } from "next/router";
import styled from "styled-components";
import SpecificCombinationList from "@/components/SpecificCombinationList/SpecificCombinationList";
import CopyFieldSlider from "@/components/CopyFieldSlider";
import { useState } from "react";
import { IsColorBright } from "@/utils/IsColorBright/index.js";
import FavoriteButton from "@/components/FavoriteButton";
import FavoriteMessage from "@/components/FavoriteMessage";

export default function ColorPage({
  data,
  error,
  onToggleFavoriteColor,
  favoriteColorsData,
  onToggleFavoriteCombination,
  favoriteCombinationsData,
}) {
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();
  const { slug } = router.query;
  const [showFavMessage, setShowFavMessage] = useState(false);
  const [favMessageName, setFavMessageName] = useState("");

  let currentColor;

  if (error) return <h1>Failed to load data..</h1>;
  if (!data) return <h1>Loading..</h1>;

  currentColor = data?.find((color) => color.slug === slug);

  if (!currentColor) return <h1>Loading...</h1>;

  const { name, hex, rgb } = currentColor;

  function handleSlide() {
    setIsActive(!isActive);
  }

  function handleShowFavMessage(toggleValue) {
    setShowFavMessage(true);
    setFavMessageName(toggleValue);
    const timer = setTimeout(() => setShowFavMessage(false), 1000);
  }

  const favoriteStatus = favoriteColorsData?.find(
    (color) => color.name === name
  );

  return (
    <PageContainer>
      <StyledColorBox hex={hex}>
        <FavoriteMessage
          isFavorite={favoriteStatus?.isFavorite}
          showFavMessage={showFavMessage}
          isTriggered={name === favMessageName}
        />
        <FavoriteButton
          isBright={IsColorBright(rgb)}
          isFavorite={favoriteStatus?.isFavorite}
          isOnDetailColor={true}
          toggleValue={name}
          onToggleFavorite={onToggleFavoriteColor}
          onShowFavMessage={handleShowFavMessage}
        />
        <StyledHeadline isBright={IsColorBright(rgb)}>{name}</StyledHeadline>
        <CopyFieldSlider
          color={currentColor}
          isLargeCombination={true}
          isActive={isActive}
          handleSlide={handleSlide}
          needColorName={false}
        />
      </StyledColorBox>
      <SpecificCombinationList
        currentColor={currentColor}
        colors={data}
        favoriteCombinationsData={favoriteCombinationsData}
        onToggleFavoriteCombination={onToggleFavoriteCombination}
      />
    </PageContainer>
  );
}

const PageContainer = styled.main`
  display: flex;
  flex-direction: column;
  margin-top: 15.5vh;
  @media screen and (min-width: 1024px), screen and (orientation: landscape) {
    width: 70%;
    margin-left: 30%;
    margin-top: 6.5vh;
  }
`;

const StyledColorBox = styled.header`
  position: relative;
  height: 30vh;
  display: flex;
  padding: 3vh 0 0 0;
  align-items: center;
  flex-direction: column;
  overflow-x: hidden;
  background-color: ${({ hex }) => (hex ? hex : null)};
`;

const StyledHeadline = styled.h1`
  color: ${({ isBright }) => (isBright ? "black" : "white")};
  font-size: 3vh;
  font-weight: lighter;
  padding: 2vh 0 4vh;
`;
