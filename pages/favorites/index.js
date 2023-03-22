import ColorsList from "@/components/ColorsList";
import PalettesList from "@/components/PalettesList";
import { CreatePaletteArray } from "@/utils/CreatePaletteArray";
import styled from "styled-components";

const PageContainer = styled.main`
  margin: 0 0 2vh;
`;

const NoFavoritesInfo = styled.p`
  padding-top: 50vh;
  font-size: 3vh;
  text-align: center;
`;

export default function Home({
  error,
  data,
  onToggleFavoriteColor,
  favoriteColorsData,
  onToggleFavoritePalette,
  favoritePalettesData,
  listType,
  paletteListType,
  colorListType,
}) {
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
    <PageContainer showsColorList={listType === "colors"}>
      {favoriteColorsList.length === 0 && listType === "colors" && (
        <NoFavoritesInfo>No bookmarked colors</NoFavoritesInfo>
      )}
      {favoritePalettesList.length === 0 && listType === "palettes" && (
        <NoFavoritesInfo>No bookmarked palettes</NoFavoritesInfo>
      )}
      {listType === "colors" && (
        <ColorsList
          colors={favoriteColorsList}
          colorListType={colorListType}
          onToggleFavorite={onToggleFavoriteColor}
          favoriteColorsData={favoriteColorsData}
        />
      )}
      {listType === "palettes" && (
        <PalettesList
          paletteArray={favoritePalettesList}
          onToggleFavorite={onToggleFavoritePalette}
          favoritePalettesData={favoritePalettesData}
          paletteListType={paletteListType}
        />
      )}
    </PageContainer>
  );
}
