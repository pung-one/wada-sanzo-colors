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
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import useSWR from "swr";
import { AnnouncementModal } from "../AnnouncementModal/AnnouncementModal";
import { validProviders } from "@/lib/authOptions";

export type ContextProps = {
  listType: "colors" | "combinations";
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

async function fetcher(url: string, id_token?: string) {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${id_token}` },
  });

  if (res.status === 401 || res.status === 404 || res.status === 400) {
    const error = new Error(res.statusText);
    (error as any).status = res.status;
    throw error;
  }

  if (!res.ok) {
    const error = new Error("An error occurred");
    (error as any).status = res.status;
    throw error;
  }

  return await res.json();
}

export function Layout({ children }: { children: React.ReactNode }) {
  const route = usePathname();

  const router = useRouter();

  const { data: session } = useSession();

  const { data: favDataFromDb, error: favDataError } = useSWR<FavData>(
    !session || !validProviders.includes(session?.idProvider)
      ? null
      : `/api/favorites?idProvider=${session?.idProvider}`,
    (url: string) => fetcher(url, session?.id_token)
  );

  const [favoriteColorsData, setFavoriteColorsData] = useState<FavoriteColor[]>(
    []
  );

  const [favoriteCombinationsData, setFavoriteCombinationsData] = useState<
    FavoriteCombination[]
  >([]);

  const [listType, setListType] = useState<"colors" | "combinations">(
    "combinations"
  );

  const [combinationListType, setCombinationListType] = useState(0);

  const [colorListType, setColorListType] = useState(0);

  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    if (session && !validProviders.includes(session.idProvider)) {
      signOut();
      router.replace("/signin");
    }
  }, [session]);

  useEffect(() => {
    if (favDataError) {
      signOut();
      router.replace("/signin");
    }
  }, [favDataError, router]);

  useEffect(() => {
    setColorListType(0);
    setCombinationListType(0);
  }, [route]);

  useEffect(() => {
    if (favDataFromDb) {
      setFavoriteColorsData(favDataFromDb?.favoriteColors);
      localStorage.setItem(
        "favoriteColorsData",
        JSON.stringify(favDataFromDb.favoriteColors)
      );

      setFavoriteCombinationsData(favDataFromDb?.favoriteCombinations);
      localStorage.setItem(
        "favoriteCombinationsData",
        JSON.stringify(favDataFromDb?.favoriteCombinations)
      );
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

      <AnnouncementModal show={showModal} onClose={() => setShowModal(false)} />
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
  height: 60px;
  top: 0;
  font-weight: lighter;
  background-color: white;
  border-bottom: 1px solid black;
  padding: 10px 20px;
`;

const SignInOutButton = styled(Link)<{ $isActive: boolean }>`
  padding: 10px;
  border: 1px solid black;
  font-size: 0.8rem;
  white-space: nowrap;
  background-color: ${({ $isActive }) => ($isActive ? "black" : "white")};
  color: ${({ $isActive }) => ($isActive ? "white" : "black")};
  box-shadow: ${({ $isActive }) => ($isActive ? "" : "0 0 2px black")};
  transition: all 0.2s;
  &:hover {
    cursor: pointer;
    box-shadow: none;
  }
  @media screen and (min-width: 1024px), screen and (orientation: landscape) {
    font-size: 1rem;
  }
`;

const DonationButton = styled.a`
  z-index: 999;
  position: fixed;
  bottom: 10px;
  left: 10px;
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
