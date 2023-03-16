import GlobalStyle from "@/styles";
import Head from "next/head";
import useSWR from "swr";
import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";

const userName = "admin";

const fetcher = (URL) => fetch(URL).then((response) => response.json());

export default function App({ Component, pageProps }) {
  const { data, error } = useSWR("/api/colors", fetcher);
  const { data: favData, error: favDataError } = useSWR(
    `/api/favorites/${userName}`,
    fetcher
  );
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

  useEffect(() => {
    setFavoriteColorsData(favData?.favoriteColors);
    setFavoritePalettesData(favData?.favoritePalettes);
  }, [favData]);

  async function handleUpdateFavs(userName, itemValue) {
    const body = {
      user: userName,
      favoriteColors: favoriteColorsData,
      favoritePalettes: favoritePalettesData,
    };

    const response = await fetch(`/api/favorites/${userName}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      await response.json();
      console.log(response);
    } else {
      console.error(response);
    }
  }

  async function handleToggleFavoriteColor(colorName) {
    setFavoriteColorsData((prevFavoriteColorsData) => {
      const favStatus = prevFavoriteColorsData.find(
        (element) => element.name === colorName
      );
      if (favStatus) {
        return prevFavoriteColorsData.map((color) =>
          color.name === colorName
            ? { name: color.name, isFavorite: !color.isFavorite }
            : color
        );
      }
      return [...prevFavoriteColorsData, { name: colorName, isFavorite: true }];
    });
    console.log(typeof colorName);
    handleUpdateFavs(userName, colorName);
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
    handleUpdateFavs(userName, id);
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
