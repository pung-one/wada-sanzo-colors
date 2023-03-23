import GlobalStyle from "@/styles";
import Head from "next/head";
import useSWR from "swr";
import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import { useRouter } from "next/router";

const userName = "admin";

const fetcher = (URL) => fetch(URL).then((response) => response.json());

export default function App({ Component, pageProps }) {
  const { data, error } = useSWR("/api/colors", fetcher);
  const { data: favData, error: favDataError } = useSWR(
    `/api/favorites/${userName}`,
    fetcher
  );
  const router = useRouter();
  const route = router.route;
  const [inspirationPageFilter, setInspirationPageFilter] =
    useState("initialPage");

  const [listType, setListType] = useLocalStorageState("listType", {
    defaultValue: "colors",
  });

  const [paletteListType, setPaletteListType] = useState(0);
  const [colorListType, setColorListType] = useState(0);

  function handleShowColors() {
    setListType("colors");
  }

  function handleShowPalettes() {
    setListType("palettes");
  }

  function handleShowPalettesWith2Colors() {
    if (paletteListType === 2) {
      setPaletteListType(0);
    } else {
      setPaletteListType(2);
    }
  }

  function handleShowPalettesWith3Colors() {
    if (paletteListType === 3) {
      setPaletteListType(0);
    } else {
      setPaletteListType(3);
    }
  }

  function handleShowPalettesWith4Colors() {
    if (paletteListType === 4) {
      setPaletteListType(0);
    } else {
      setPaletteListType(4);
    }
  }

  function handleShowSwatchOne() {
    if (colorListType === 1) {
      setColorListType(0);
    } else {
      setColorListType(1);
    }
  }

  function handleShowSwatchTwo() {
    if (colorListType === 2) {
      setColorListType(0);
    } else {
      setColorListType(2);
    }
  }

  function handleShowSwatchThree() {
    if (colorListType === 3) {
      setColorListType(0);
    } else {
      setColorListType(3);
    }
  }

  function handleShowSwatchFour() {
    if (colorListType === 4) {
      setColorListType(0);
    } else {
      setColorListType(4);
    }
  }

  function handleShowSwatchFive() {
    if (colorListType === 5) {
      setColorListType(0);
    } else {
      setColorListType(5);
    }
  }

  function handleShowSwatchSix() {
    if (colorListType === 6) {
      setColorListType(0);
    } else {
      setColorListType(6);
    }
  }

  useEffect(() => {
    setColorListType(0);
    setPaletteListType(0);
  }, [route]);

  const [favoriteColorsData, setFavoriteColorsData] = useLocalStorageState(
    "favoriteColorsData",
    { defaultValue: [] }
  );

  const [favoritePalettesData, setFavoritePalettesData] = useLocalStorageState(
    "favoritePalettesData",
    { defaultValue: [] }
  );

  useEffect(() => {
    if (favData) {
      setFavoriteColorsData(favData?.favoriteColors);
      setFavoritePalettesData(favData?.favoritePalettes);
    }
  }, [favData]);

  useEffect(() => {
    handleUpdateFavs(userName);
  }, [favoriteColorsData, favoritePalettesData]);

  async function handleUpdateFavs(userName) {
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
    } else {
      console.error(response.status);
    }
  }

  async function handleToggleFavoriteColor(colorName, colorSwatch) {
    setFavoriteColorsData((prevFavoriteColorsData) => {
      const favStatus = prevFavoriteColorsData.find(
        (element) => element.name === colorName
      );
      if (favStatus) {
        return prevFavoriteColorsData.map((color) =>
          color.name === colorName
            ? {
                name: color.name,
                swatch: color.swatch,
                isFavorite: !color.isFavorite,
              }
            : color
        );
      }
      return [
        ...prevFavoriteColorsData,
        { name: colorName, swatch: colorSwatch, isFavorite: true },
      ];
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
        handleShowColors={handleShowColors}
        handleShowPalettes={handleShowPalettes}
        listType={listType}
        paletteListType={paletteListType}
        handleShowPalettesWith2Colors={handleShowPalettesWith2Colors}
        handleShowPalettesWith3Colors={handleShowPalettesWith3Colors}
        handleShowPalettesWith4Colors={handleShowPalettesWith4Colors}
        favoritePalettesData={favoritePalettesData}
        colorListType={colorListType}
        handleShowSwatchOne={handleShowSwatchOne}
        handleShowSwatchTwo={handleShowSwatchTwo}
        handleShowSwatchThree={handleShowSwatchThree}
        handleShowSwatchFour={handleShowSwatchFour}
        handleShowSwatchFive={handleShowSwatchFive}
        handleShowSwatchSix={handleShowSwatchSix}
        favoriteColorsData={favoriteColorsData}
      >
        <Component
          {...pageProps}
          data={data}
          error={error}
          listType={listType}
          paletteListType={paletteListType}
          colorListType={colorListType}
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
