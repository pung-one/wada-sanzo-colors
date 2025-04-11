import styled from "styled-components";
import ColorsList from "@/components/ColorsList";
import CombinationsList from "@/components/CombinationsList";
import { colorsWithSlug } from "@/data/colors";
import { createCombinationArray } from "@/utils/helper";

export default function Home() {
  const combinationArray = createCombinationArray(colorsWithSlug);

  return (
    <PageContainer>
      {listType === "colors" ? (
        <ColorsList
          colors={colorsWithSlug}
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
