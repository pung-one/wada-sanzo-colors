import styled from "styled-components";
import ColorsList from "@/components/ColorsList";
import PalettesList from "@/components/PalettesList";
import { CreatePaletteArray } from "@/utils/CreatePaletteArray";

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
  if (error) return <ErrorMessage>Failed to load data..</ErrorMessage>;
  if (!data) return <ErrorMessage>Loading..</ErrorMessage>;

  const paletteArray = CreatePaletteArray(data);

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
        <PalettesList
          paletteArray={paletteArray}
          paletteListType={paletteListType}
          onToggleFavorite={onToggleFavoritePalette}
          favoritePalettesData={favoritePalettesData}
        />
      )}
    </PageContainer>
  );
}

const PageContainer = styled.main`
  margin: 0 0 2vh;
`;

const ErrorMessage = styled.h1`
  text-align: center;
  margin-top: 40vh;
`;
