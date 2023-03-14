import { useState } from "react";
import styled from "styled-components";
import ColorsList from "@/components/ColorsList";
import TabBar from "@/components/TabBar";
import PalettesList from "@/components/PalettesList";

export default function Home({
  error,
  data,
  onToggleFavoriteColor,
  favoriteColors,
  onToggleFavoritePalette,
  favoritePalettes,
}) {
  const [listType, setListType] = useState("colors");

  function handleShowColors() {
    setListType("colors");
  }

  function handleShowPalettes() {
    setListType("palettes");
  }

  return (
    <main>
      <TabBar
        onShowColors={handleShowColors}
        onShowPalettes={handleShowPalettes}
        listType={listType}
      />
      {listType === "colors" ? (
        <ColorsList
          colors={data}
          error={error}
          onToggleFavorite={onToggleFavoriteColor}
          favoriteColors={favoriteColors}
        />
      ) : (
        <PalettesList
          data={data}
          error={error}
          onToggleFavorite={onToggleFavoritePalette}
          favoritePalettes={favoritePalettes}
        />
      )}
    </main>
  );
}
