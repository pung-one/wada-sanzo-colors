import GlobalStyle from "@/styles";
import Head from "next/head";
import useSWR from "swr";
import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";

const fetcher = (URL) => fetch(URL).then((response) => response.json());

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [user, setUser] = useState("public");
  const { data, error } = useSWR("/api/colors", fetcher);

  const { data: favData, error: favDataError } = useSWR(
    `/api/favorites/${user}`,
    fetcher
  );

  const router = useRouter();
  const route = router.route;

  const [favoriteColorsData, setFavoriteColorsData] = useLocalStorageState(
    "favoriteColorsData",
    { defaultValue: [] }
  );

  const [favoriteCombinationsData, setFavoriteCombinationsData] =
    useLocalStorageState("favoriteCombinationsData", { defaultValue: [] });

  const [listType, setListType] = useLocalStorageState("listType", {
    defaultValue: "colors",
  });

  const [inspirationPageFilter, setInspirationPageFilter] =
    useState("initialPage");

  const [combinationListType, setCombinationListType] = useState(0);

  const [colorListType, setColorListType] = useState(0);

  useEffect(() => {
    setColorListType(0);
    setCombinationListType(0);
  }, [route]);

  useEffect(() => {
    if (favData && user !== "public") {
      setFavoriteColorsData(favData?.favoriteColors);
      setFavoriteCombinationsData(favData?.favoriteCombinations);
    }
  }, [favData]);

  useEffect(() => {
    if (user !== "public") {
      handleUpdateFavs(user);
    }
  }, [favoriteColorsData, favoriteCombinationsData]);

  async function handleUpdateFavs(user) {
    const body = {
      user: user,
      favoriteColors: favoriteColorsData,
      favoriteCombinations: favoriteCombinationsData,
    };

    const response = await fetch(`/api/favorites/${user}`, {
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

  function handleToggleFavoriteCombination(id) {
    setFavoriteCombinationsData((prevFavoriteCombinationsData) => {
      const favStatus = prevFavoriteCombinationsData.find(
        (element) => element.id === id
      );
      if (favStatus) {
        return prevFavoriteCombinationsData.map((combination) =>
          combination.id === id
            ? { id: combination.id, isFavorite: !combination.isFavorite }
            : combination
        );
      }
      return [...prevFavoriteCombinationsData, { id: id, isFavorite: true }];
    });
  }

  function handleShowColors() {
    setListType("colors");
  }

  function handleShowCombinations() {
    setListType("combinations");
  }

  function handleShowCombinationsWith2Colors() {
    if (combinationListType === 2) {
      setCombinationListType(0);
    } else {
      setCombinationListType(2);
    }
  }

  function handleShowCombinationsWith3Colors() {
    if (combinationListType === 3) {
      setCombinationListType(0);
    } else {
      setCombinationListType(3);
    }
  }

  function handleShowCombinationsWith4Colors() {
    if (combinationListType === 4) {
      setCombinationListType(0);
    } else {
      setCombinationListType(4);
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

  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Wada Sanzo Colors</title>
        <link rel="icon" href="/favicon/rainbow-gradient-circle.ico" />
        <meta
          name="description"
          content="This website offers an interactive adaptation of the book 'A Dictionary of Color Combinations Vol. 1' by Wada Sanzo, that allows users to access and copy the colors CMYK, RGB, HEX, and LAB codes."
          key="desc"
        />
        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="Wada Sanzo Colors" />
        <meta
          property="og:description"
          content="This website offers an interactive adaptation of the book 'A Dictionary of Color Combinations Vol. 1' by Wada Sanzo, that allows users to access and copy the colors CMYK, RGB, HEX, and LAB codes."
        />
      </Head>
      <SessionProvider session={session}>
        <Layout
          inspirationPageFilter={inspirationPageFilter}
          setInspirationPageFilter={setInspirationPageFilter}
          handleShowColors={handleShowColors}
          handleShowCombinations={handleShowCombinations}
          listType={listType}
          combinationListType={combinationListType}
          handleShowCombinationsWith2Colors={handleShowCombinationsWith2Colors}
          handleShowCombinationsWith3Colors={handleShowCombinationsWith3Colors}
          handleShowCombinationsWith4Colors={handleShowCombinationsWith4Colors}
          favoriteCombinationsData={favoriteCombinationsData}
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
            setUser={setUser}
            listType={listType}
            combinationListType={combinationListType}
            colorListType={colorListType}
            inspirationPageFilter={inspirationPageFilter}
            setInspirationPageFilter={setInspirationPageFilter}
            favoriteColorsData={favoriteColorsData}
            onToggleFavoriteColor={handleToggleFavoriteColor}
            favoriteCombinationsData={favoriteCombinationsData}
            onToggleFavoriteCombination={handleToggleFavoriteCombination}
          />
        </Layout>
      </SessionProvider>
    </>
  );
}
