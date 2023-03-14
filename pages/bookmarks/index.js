import { useState } from "react";
import ColorsList from "@/components/ColorsList";
import TabBar from "@/components/TabBar";
import PalettesList from "@/components/PalettesList";
import useLocalStorageState from "use-local-storage-state";
import { CreatePaletteArray } from "@/utils/CreatePaletteArray";

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

  const favoriteColors = favoriteColorsData.filter((color) => color.isFavorite);
  const favoriteColorsList = data?.filter((color1) =>
    favoriteColors.some((color2) => color2.name === color1.name)
  );

  const allPalettesArray = CreatePaletteArray(data);
  const favoritePalettes = favoritePalettesData.filter(
    (palette) => palette.isFavorite
  );
  const favoritePalettesList = allPalettesArray?.filter((palette1) =>
    favoritePalettes.some((palette2) => palette2.id === palette1.id)
  );

  return (
    <main>
      <TabBar
        onShowColors={handleShowColors}
        onShowPalettes={handleShowPalettes}
        listType={listType}
      />
      {listType === "colors" ? (
        <ColorsList
          colors={favoriteColorsList}
          error={error}
          onToggleFavorite={onToggleFavoriteColor}
          favoriteColorsData={favoriteColorsData}
        />
      ) : (
        <PalettesList
          paletteArray={favoritePalettesList}
          onToggleFavorite={onToggleFavoritePalette}
          favoritePalettesData={favoritePalettesData}
        />
      )}
    </main>
  );
}
