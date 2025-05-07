"use client";

import styled from "styled-components";
import NavBar from "../Navbar/NavBar";
import NavBarDesktop from "../NavBarDesktop/NavBarDesktop";
import Link from "next/link";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { FavData, FavoriteColor, FavoriteCombination } from "@/lib/types";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import useSWR from "swr";

export type ContextProps = {
  listType: string;
  setListType: (type: "colors" | "combinations") => void;
  combinationListType: number;
  setCombinationListType: (type: number) => void;
  colorListType: number;
  setColorListType: (type: number) => void;
  favoriteColorsData: FavoriteColor[];
  setFavoriteColorsData: Dispatch<SetStateAction<FavoriteColor[]>>;
  favoriteCombinationsData: FavoriteCombination[];
  setFavoriteCombinationsData: Dispatch<SetStateAction<FavoriteCombination[]>>;
};

export const ActionContext = createContext<ContextProps | null>(null);

async function fetcher(url: string) {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (e) {
    console.error(e);
  }
}

export function Layout({ children }: { children: React.ReactNode }) {
  const route = usePathname();

  const { data: session } = useSession();

  const user = session?.user?.name || "public";

  const { data: favDataFromDb, error: favDataError } = useSWR<FavData>(
    user !== "public" ? `/api/favorites?user=${user}` : null,
    fetcher
  );

  const [favoriteColorsData, setFavoriteColorsData] = useState<FavoriteColor[]>(
    []
  );

  const [favoriteCombinationsData, setFavoriteCombinationsData] = useState<
    FavoriteCombination[]
  >([]);
  const [listType, setListType] = useState<"colors" | "combinations">("colors");

  const [combinationListType, setCombinationListType] = useState(0);

  const [colorListType, setColorListType] = useState(0);

  useEffect(() => {
    setColorListType(0);
    setCombinationListType(0);
  }, [route]);

  useEffect(() => {
    if (user !== "public" && favDataFromDb) {
      setFavoriteColorsData(favDataFromDb?.favoriteColors);
      setFavoriteCombinationsData(favDataFromDb?.favoriteCombinations);
    } else {
      setFavoriteColorsData(
        JSON.parse(localStorage.getItem("favoriteColorsData") || "[]")
      );
      setFavoriteCombinationsData(
        JSON.parse(localStorage.getItem("favoriteCombinationsData") || "[]")
      );
    }
  }, [favDataFromDb]);

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
          listType: listType,
          setListType: setListType,
          combinationListType: combinationListType,
          setCombinationListType: setCombinationListType,
          colorListType: colorListType,
          setColorListType: setColorListType,
          favoriteColorsData: favoriteColorsData,
          setFavoriteColorsData: setFavoriteColorsData,
          favoriteCombinationsData: favoriteCombinationsData,
          setFavoriteCombinationsData: setFavoriteCombinationsData,
        }}
      >
        <NavBar />

        <NavBarDesktop />

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
