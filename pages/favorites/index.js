import ColorsList from "@/components/ColorsList";
import PalettesList from "@/components/PalettesList";
import { CreatePaletteArray } from "@/utils/CreatePaletteArray";
import styled from "styled-components";

export default function Favorites({
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
  if (error) return <ErrorMessage>Failed to load data..</ErrorMessage>;
  if (!data) return <ErrorMessage>Loading..</ErrorMessage>;

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
        <NoFavoritesInfo>No favorite colors.</NoFavoritesInfo>
      )}
      {favoritePalettesList.length === 0 && listType === "palettes" && (
        <NoFavoritesInfo>No favorite palettes.</NoFavoritesInfo>
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

const PageContainer = styled.main`
  margin: 0 0 2vh;
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
