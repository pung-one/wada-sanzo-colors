import GlobalStyle from "@/styles";
import Head from "next/head";
import useSWR from "swr";
import Layout from "@/components/Layout";
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
    setFavoriteColorsData((prevFavoriteColorsData) => {
      const favStatus = prevFavoriteColorsData.find(
        (element) => element.name === name
      );
      if (favStatus) {
        return prevFavoriteColorsData.map((color) =>
          color.name === name
            ? { name: color.name, isFavorite: !color.isFavorite }
            : color
        );
      }
      return [...prevFavoriteColorsData, { name: name, isFavorite: true }];
    });
  }

  function handleToggleFavoritePalette(id) {
    setFavoritePalettesData((prevFavoritePalettesData) => {
      const favStatus = prevFavoritePalettesData.find(
        (element) => element.id === id
      );
      if (favStatus) {
        return prevFavoritePalettesData.map((palette) =>
          palette.id === id
            ? { id: palette.id, isFavorite: !palette.isFavorite }
            : palette
        );
      }
      return [...prevFavoritePalettesData, { id: id, isFavorite: true }];
    });
  }

  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Colors</title>
      </Head>
      <Layout
        inspirationPageFilter={inspirationPageFilter}
        setInspirationPageFilter={setInspirationPageFilter}
      >
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
