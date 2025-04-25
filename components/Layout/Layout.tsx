"use client";

import styled from "styled-components";
import NavBar from "../Navbar/NavBar";
import NavBarDesktop from "../NavBarDesktop/NavBarDesktop";
import Link from "next/link";
import { createContext, useEffect, useState } from "react";
import useSWR from "swr";
import { useLocalStorage } from "@/utils/useLocalStorage";
import { FavoriteColor, FavoriteCombination } from "@/lib/types";
import { usePathname } from "next/navigation";

export type ContextProps = {
  setUser: (val: string) => void;
  listType: string;
  combinationListType: number;
  colorListType: number;
  inspirationPageFilter: string;
  setInspirationPageFilter: (val: string) => void;
  favoriteColorsData: FavoriteColor[];
  onToggleFavoriteColor: (colorName: any, colorSwatch: any) => void;
  favoriteCombinationsData: FavoriteCombination[];
  onToggleFavoriteCombination: (id: number) => void;
};

export const ActionContext = createContext<ContextProps | null>(null);

const fetcher = (URL: string) => fetch(URL).then((response) => response.json());

export function Layout({ children }: { children: React.ReactNode }) {
  const route = usePathname();

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

  function handleToggleFavoriteColor(colorName: string, colorSwatch: number) {
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

  function handleToggleFavoriteCombination(id: number) {
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

  return (
    <>
      <Header>
        A Dictionary of Color Combinations
        <SignInOutButton $isActive={route === "/signin"} href={"/signin"}>
          Sign In/Out
        </SignInOutButton>
      </Header>

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
        <NavBar
          handleShowColors={handleShowColors}
          handleShowCombinations={handleShowCombinations}
          handleShowCombinationsWith2Colors={handleShowCombinationsWith2Colors}
          handleShowCombinationsWith3Colors={handleShowCombinationsWith3Colors}
          handleShowCombinationsWith4Colors={handleShowCombinationsWith4Colors}
          setColorListType={setColorListType}
        />

        <NavBarDesktop
          handleShowColors={handleShowColors}
          handleShowCombinations={handleShowCombinations}
          handleShowCombinationsWith2Colors={handleShowCombinationsWith2Colors}
          handleShowCombinationsWith3Colors={handleShowCombinationsWith3Colors}
          handleShowCombinationsWith4Colors={handleShowCombinationsWith4Colors}
          setColorListType={setColorListType}
        />

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

const SignInOutButton = styled(Link)<{ $isActive: boolean }>`
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
