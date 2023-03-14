import GlobalStyle from "@/styles";
import Head from "next/head";
import useSWR from "swr";
import Layout from "@/components/Navigation";
import { useState } from "react";
import useLocalStorageState from "use-local-storage-state";

const fetcher = (URL) => fetch(URL).then((response) => response.json());

export default function App({ Component, pageProps }) {
  const { data, error } = useSWR("/api/colors", fetcher);
  const [inspirationPageFilter, setInspirationPageFilter] =
    useState("initialPage");
  const [favoriteColorsData, setFavoriteColorsData] = useLocalStorageState(
    "favoriteColorsData",
    { defaultValue: [] }
  );
  const [favoritePalettesData, setFavoritePalettesData] = useLocalStorageState(
    "favoritePalettesData",
    { defaultValue: [] }
  );

  function handleToggleFavoriteColor(name) {
    if (!favoriteColorsData[0]) {
      setFavoriteColorsData([{ name: name, isFavorite: true }]);
    } else if (!favoriteColorsData.some((color) => color.name === name)) {
      setFavoriteColorsData([
        ...favoriteColorsData,
        { name: name, isFavorite: true },
      ]);
    } else {
      setFavoriteColorsData(
        favoriteColorsData.map((color) => {
          if (color.name === name)
            return { ...color, isFavorite: !color.isFavorite };
          return color;
        })
      );
    }
  }

  function handleToggleFavoritePalette(id) {
    if (!favoritePalettesData[0]) {
      setFavoritePalettesData([{ id: id, isFavorite: true }]);
    } else if (!favoritePalettesData.some((palette) => palette.id === id)) {
      setFavoritePalettesData([
        ...favoritePalettesData,
        { id: id, isFavorite: true },
      ]);
    } else {
      setFavoritePalettesData(
        favoritePalettesData.map((palette) => {
          if (palette.id === id)
            return { ...palette, isFavorite: !palette.isFavorite };
          return palette;
        })
      );
    }
  }

  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Colors</title>
      </Head>
      <Layout setInspirationPageFilter={setInspirationPageFilter}>
        <Component
          {...pageProps}
          data={data}
          error={error}
          inspirationPageFilter={inspirationPageFilter}
          setInspirationPageFilter={setInspirationPageFilter}
          favoriteColorsData={favoriteColorsData}
          onToggleFavoriteColor={handleToggleFavoriteColor}
          favoritePalettesData={favoritePalettesData}
          onToggleFavoritePalette={handleToggleFavoritePalette}
        />
      </Layout>
    </>
  );
}
