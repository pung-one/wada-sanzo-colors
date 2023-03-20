import styled from "styled-components";
import ColorsList from "@/components/ColorsList";
import PalettesList from "@/components/PalettesList";
import { CreatePaletteArray } from "@/utils/CreatePaletteArray";

const PageContainer = styled.main`
  margin: ${({ showsColorList }) =>
    showsColorList ? "32vh 0 2vh" : "26vh 0 2vh"};
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
}) {
  if (error) return <h1>Failed to load data..</h1>;
  if (!data) return <h1>Loading...</h1>;

  const paletteArray = CreatePaletteArray(data);

  return (
    <PageContainer showsColorList={listType === "colors"}>
      {listType === "colors" ? (
        <ColorsList
          colors={data}
          error={error}
          onToggleFavorite={onToggleFavoriteColor}
          favoriteColorsData={favoriteColorsData}
        />
      ) : (
        <PalettesList
          paletteArray={paletteArray}
          paletteListType={paletteListType}
          error={error}
          onToggleFavorite={onToggleFavoritePalette}
          favoritePalettesData={favoritePalettesData}
        />
      )}
    </PageContainer>
  );
}
