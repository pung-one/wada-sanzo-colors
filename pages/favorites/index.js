import ColorsList from "@/components/ColorsList";
import CombinationsList from "@/components/CombinationsList";
import { CreateCombinationArray } from "@/utils/CreateCombinationArray";
import styled from "styled-components";

export default function Favorites({
  error,
  data,
  onToggleFavoriteColor,
  favoriteColorsData,
  onToggleFavoriteCombination,
  favoriteCombinationsData,
  listType,
  combinationListType,
  colorListType,
}) {
  if (error) return <ErrorMessage>Failed to load data..</ErrorMessage>;
  if (!data) return <ErrorMessage>Loading..</ErrorMessage>;

  const favoriteColors = favoriteColorsData?.filter(
    (color) => color.isFavorite
  );
  const favoriteColorsList = data?.filter((color1) =>
    favoriteColors?.some((color2) => color2.name === color1.name)
  );

  const allCombinationsArray = CreateCombinationArray(data);
  const favoriteCombinations = favoriteCombinationsData?.filter(
    (combination) => combination.isFavorite
  );
  const favoriteCombinationsList = allCombinationsArray?.filter(
    (combination1) =>
      favoriteCombinations?.some(
        (combination2) => combination2.id === combination1.id
      )
  );

  return (
    <PageContainer showsColorList={listType === "colors"}>
      {favoriteColorsList.length === 0 && listType === "colors" && (
        <NoFavoritesInfo>No favorite colors.</NoFavoritesInfo>
      )}
      {favoriteCombinationsList.length === 0 && listType === "combinations" && (
        <NoFavoritesInfo>No favorite combinations.</NoFavoritesInfo>
      )}
      {listType === "colors" && (
        <ColorsList
          colors={favoriteColorsList}
          colorListType={colorListType}
          onToggleFavorite={onToggleFavoriteColor}
          favoriteColorsData={favoriteColorsData}
        />
      )}
      {listType === "combinations" && (
        <CombinationsList
          combinationArray={favoriteCombinationsList}
          onToggleFavorite={onToggleFavoriteCombination}
          favoriteCombinationsData={favoriteCombinationsData}
          combinationListType={combinationListType}
        />
      )}
    </PageContainer>
  );
}

const PageContainer = styled.main`
  margin: 0 0 2vh;
  @media screen and (min-width: 1024px), screen and (orientation: landscape) {
    width: 61.8vw;
  }
`;

const NoFavoritesInfo = styled.p`
  padding-top: 50vh;
  font-size: 3vh;
  text-align: center;
`;

const ErrorMessage = styled.h1`
  text-align: center;
  margin-top: 40vh;
`;
