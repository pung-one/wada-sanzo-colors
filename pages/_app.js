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
  const [favoriteColors, setFavoriteColors] = useLocalStorageState(
    "favoriteColors",
    { defaultValue: [] }
  );
  const [favoritePalettes, setFavoritePalettes] = useLocalStorageState(
    "favoritePalettes",
    { defaultValue: [] }
  );

  function handleToggleFavoriteColor(name) {
    if (!favoriteColors[0]) {
      setFavoriteColors([{ name: name, isFavorite: true }]);
    } else if (!favoriteColors.some((color) => color.name === name)) {
      setFavoriteColors([...favoriteColors, { name: name, isFavorite: true }]);
    } else {
      setFavoriteColors(
        favoriteColors.map((color) => {
          if (color.name === name)
            return { ...color, isFavorite: !color.isFavorite };
          return color;
        })
      );
    }
  }

  function handleToggleFavoritePalette(id) {
    if (!favoritePalettes[0]) {
      setFavoritePalettes([{ id: id, isFavorite: true }]);
    } else if (!favoritePalettes.some((palette) => palette.id === id)) {
      setFavoritePalettes([...favoritePalettes, { id: id, isFavorite: true }]);
    } else {
      setFavoritePalettes(
        favoritePalettes.map((palette) => {
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
          favoriteColors={favoriteColors}
          onToggleFavoriteColor={handleToggleFavoriteColor}
          favoritePalettes={favoritePalettes}
          onToggleFavoritePalette={handleToggleFavoritePalette}
        />
      </Layout>
    </>
  );
}
