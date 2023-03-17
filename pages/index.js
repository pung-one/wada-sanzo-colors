import useLocalStorageState from "use-local-storage-state";
import styled from "styled-components";
import ColorsList from "@/components/ColorsList";
import TabBar from "@/components/TabBar";
import PalettesList from "@/components/PalettesList";
import { CreatePaletteArray } from "@/utils/CreatePaletteArray";

const PageContainer = styled.main`
  margin: 19vh 0 2vh;
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

  const paletteArray = CreatePaletteArray(data);

  return (
    <PageContainer>
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
          error={error}
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
