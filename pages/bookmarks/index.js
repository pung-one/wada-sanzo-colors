import ColorsList from "@/components/ColorsList";
import TabBar from "@/components/TabBar";
import PalettesList from "@/components/PalettesList";
import useLocalStorageState from "use-local-storage-state";
import { CreatePaletteArray } from "@/utils/CreatePaletteArray";
import styled from "styled-components";

const PageContainer = styled.main`
  margin-top: 5vh;
  margin-bottom: 18vh;
`;

const NoBookmarksInfo = styled.p`
  padding-top: 4vh;
  font-size: 3vh;
`;

export default function Home({
  error,
  data,
  onToggleFavoriteColor,
  favoriteColorsData,
  onToggleFavoritePalette,
  favoritePalettesData,
}) {
  const [listType, setListType] = useLocalStorageState("listType", {
    defaultValue: "colors",
  });

  function handleShowColors() {
    setListType("colors");
  }

  function handleShowPalettes() {
    setListType("palettes");
  }

  if (error) return <h1>Failed to load data..</h1>;
  if (!data) return <h1>Loading...</h1>;

  const favoriteColors = favoriteColorsData?.filter(
    (color) => color.isFavorite
  );
  const favoriteColorsList = data?.filter((color1) =>
    favoriteColors?.some((color2) => color2.name === color1.name)
  );

  const allPalettesArray = CreatePaletteArray(data);
  const favoritePalettes = favoritePalettesData?.filter(
    (palette) => palette.isFavorite
  );
  const favoritePalettesList = allPalettesArray?.filter((palette1) =>
    favoritePalettes?.some((palette2) => palette2.id === palette1.id)
  );

  return (
    <PageContainer>
      {favoriteColorsList.length === 0 && listType === "colors" && (
        <NoBookmarksInfo>No bookmarked colors</NoBookmarksInfo>
      )}
      {favoritePalettesList.length === 0 && listType === "palettes" && (
        <NoBookmarksInfo>No bookmarked palettes</NoBookmarksInfo>
      )}
      {listType === "colors" && (
        <ColorsList
          colors={favoriteColorsList}
          error={error}
          onToggleFavorite={onToggleFavoriteColor}
          favoriteColorsData={favoriteColorsData}
        />
      )}
      {listType === "palettes" && (
        <PalettesList
          paletteArray={favoritePalettesList}
          onToggleFavorite={onToggleFavoritePalette}
          favoritePalettesData={favoritePalettesData}
        />
      )}
      <TabBar
        onShowColors={handleShowColors}
        onShowPalettes={handleShowPalettes}
        listType={listType}
      />
    </PageContainer>
  );
}
