"use client";

import styled from "styled-components";
import NavBar from "../Navbar";
import NavBarDesktop from "../NavBarDesktop";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { ActionContext } from "@/lib/actionsContext";
import { useLocalStorage } from "@/utils/useLocalStorage";

const fetcher = (URL: string) => fetch(URL).then((response) => response.json());

export function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const route = router.route;

  const [user, setUser] = useState<string>("public");

  const { data: favData, error: favDataError } = useSWR(
    `/api/favorites/${user}`,
    fetcher
  );

  const [favoriteColorsData, setFavoriteColorsData] = useLocalStorage(
    "favoriteColorsData",
    []
  );

  const [favoriteCombinationsData, setFavoriteCombinationsData] =
    useLocalStorage("favoriteCombinationsData", []);

  const [listType, setListType] = useLocalStorage("listType", "colors");

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

  async function handleUpdateFavs(user: string) {
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

  async function handleToggleFavoriteColor(
    colorName: string,
    colorSwatch: string
  ) {
    setFavoriteColorsData(() => {
      const favStatus = favoriteColorsData.find(
        (element: any) => element.name === colorName
      );
      if (favStatus) {
        return favoriteColorsData.map((color: any) =>
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
        ...favoriteColorsData,
        { name: colorName, swatch: colorSwatch, isFavorite: true },
      ];
    });
  }

  function handleToggleFavoriteCombination(id: string) {
    setFavoriteCombinationsData(() => {
      const favStatus = favoriteCombinationsData.find(
        (element: any) => element.id === id
      );
      if (favStatus) {
        return favoriteCombinationsData.map((combination: any) =>
          combination.id === id
            ? { id: combination.id, isFavorite: !combination.isFavorite }
            : combination
        );
      }
      return [...favoriteCombinationsData, { id: id, isFavorite: true }];
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
      <Header>
        A Dictionary of Color Combinations
        <Link href={"/signin"} passHref legacyBehavior>
          <SignInOutButton $isActive={route === "/signin"}>
            Sign In/Out
          </SignInOutButton>
        </Link>
      </Header>

      <NavBar
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
      />

      <NavBarDesktop
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
      />

      <ActionContext.Provider
        value={{
          setUser: setUser,
          listType: listType,
          combinationListType: combinationListType,
          colorListType: colorListType,
          inspirationPageFilter: inspirationPageFilter,
          setInspirationPageFilter: setInspirationPageFilter,
          favoriteColorsData: favoriteColorsData,
          onToggleFavoriteColor: handleToggleFavoriteColor,
          favoriteCombinationsData: favoriteCombinationsData,
          onToggleFavoriteCombination: handleToggleFavoriteCombination,
        }}
      >
        {children}
      </ActionContext.Provider>

      <DonationButton
        href="https://www.paypal.com/donate/?hosted_button_id=PAFRAKM2HQWVY"
        target="_blank"
      >
        Donate
      </DonationButton>
    </>
  );
}

const Header = styled.header`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 6;
  width: 100%;
  height: 6.5vh;
  top: 0;
  font-size: 2vh;
  font-weight: lighter;
  background-color: white;
  border-bottom: 1px solid black;
  padding: 1vh 0 1vh 3vw;
`;

const SignInOutButton = styled.a<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  margin-right: 2vw;
  height: 4.5vh;
  font-size: 1.8vh;
  font-weight: normal;
  padding: 0 1.5vw 0 1.5vw;
  background-color: ${({ $isActive }) => ($isActive ? "black" : "white")};
  color: ${({ $isActive }) => ($isActive ? "white" : "black")};
  border: 1px solid black;
  box-shadow: ${({ $isActive }) => ($isActive ? "" : "0 0 2px black")};
  transition: all 0.2s;
  &:hover {
    cursor: pointer;
    box-shadow: none;
  }
`;

const DonationButton = styled.a`
  z-index: 999;
  position: fixed;
  bottom: 10px;
  left: 10px;
  font-size: 1.8vh;
  font-weight: normal;
  padding: 10px;
  background-color: white;
  color: black;
  border: 1px solid black;
  box-shadow: 0 0 2px black;
  transition: all 0.2s;
  &:hover {
    cursor: pointer;
    box-shadow: none;
  }
`;
