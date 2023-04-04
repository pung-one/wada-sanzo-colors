import { CreateCombinationArray } from "@/utils/CreateCombinationArray";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useState, useEffect } from "react";
import CopyFieldSlider from "@/components/CopyFieldSlider";
import FavoriteButton from "@/components/FavoriteButton";
import FavoriteMessage from "@/components/FavoriteMessage";

export default function CombinationPage({
  data,
  error,
  favoriteCombinationsData,
  onToggleFavoriteCombination,
}) {
  const router = useRouter();
  const { id } = router.query;
  const [showFavMessage, setShowFavMessage] = useState(false);
  const [favMessageId, setFavMessageId] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [currentCombination, setCurrentCombination] = useState([]);

  useEffect(() => {
    setCurrentCombination(
      CreateCombinationArray(data).find((element) => element.id == id)
    );
  }, [data, id]);

  if (error) return <h1>Failed to load data..</h1>;
  if (!data) return <h1>Loading...</h1>;

  const isLargeCombination = currentCombination?.combination?.length > 2;

  const handleSlide = (index) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  const favoriteStatus = favoriteCombinationsData?.find(
    (combination) => combination.id == id
  );
  function handleShowFavMessage(toggleValue) {
    setShowFavMessage(true);
    setFavMessageId(toggleValue);
    const timer = setTimeout(() => setShowFavMessage(false), 1000);
  }
  return (
    <PageContainer>
      <FavoriteMessage
        isFavorite={favoriteStatus?.isFavorite}
        showFavMessage={showFavMessage}
        isTriggered={id == favMessageId}
      />
      <Heading>
        <FavoriteButton
          isFavorite={favoriteStatus?.isFavorite}
          isBright={true}
          isOnDetailCombination={true}
          toggleValue={currentCombination?.id}
          onToggleFavorite={onToggleFavoriteCombination}
          onShowFavMessage={handleShowFavMessage}
        />
        Combination #{id}
      </Heading>
      <CombinationContainer isLarge={isLargeCombination}>
        {currentCombination?.combination?.map((color, index) => {
          return (
            <ColorBox hex={color.hex} key={color.name}>
              <CopyFieldSlider
                isLargeCombination={isLargeCombination}
                color={color}
                index={index}
                handleSlide={handleSlide}
                isActive={index === activeIndex}
                needColorName={true}
              />
            </ColorBox>
          );
        })}
      </CombinationContainer>
    </PageContainer>
  );
}

const PageContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15.5vh;
  height: 84.5vh;
  @media screen and (min-width: 1024px), screen and (orientation: landscape) {
    width: 61.8vw;
    margin-top: 6.5vh;
    height: 93.5vh;
  }
`;

const Heading = styled.header`
  position: relative;
  width: 100%;
  padding: 3vh;
  height: 11vh;
  border-bottom: 1px solid black;
  font-size: 4vh;
  font-weight: lighter;
`;

const CombinationContainer = styled.div`
  display: flex;
  height: 84.5vh;
  width: 100%;
  flex-direction: ${({ isLarge }) => (isLarge ? "column" : null)};
  overflow-x: hidden;
`;

const ColorBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ hex }) => (hex ? hex : null)};
`;
