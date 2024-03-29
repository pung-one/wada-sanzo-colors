import styled from "styled-components";
import ColorsList from "@/components/ColorsList";
import CombinationsList from "@/components/CombinationsList";
import { CreateCombinationArray } from "@/utils/CreateCombinationArray";

export default function Home({
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

  const combinationArray = CreateCombinationArray(data);

  return (
    <PageContainer showsColorList={listType === "colors"}>
      {listType === "colors" ? (
        <ColorsList
          colors={data}
          colorListType={colorListType}
          onToggleFavorite={onToggleFavoriteColor}
          favoriteColorsData={favoriteColorsData}
        />
      ) : (
        <CombinationsList
          combinationArray={combinationArray}
          combinationListType={combinationListType}
          onToggleFavorite={onToggleFavoriteCombination}
          favoriteCombinationsData={favoriteCombinationsData}
        />
      )}
    </PageContainer>
  );
}

const PageContainer = styled.main`
  position: relative;
  margin: 0 0 2vh;
  @media screen and (min-width: 1024px), screen and (orientation: landscape) {
    width: 70%;
    margin-left: 30%;
  }
`;

const ErrorMessage = styled.h1`
  text-align: center;
  margin-top: 50vh;
  @media screen and (min-width: 1024px), screen and (orientation: landscape) {
    width: 70%;
    margin-left: 30%;
  }
`;
