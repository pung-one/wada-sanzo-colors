"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { FavoriteCombination, FavoriteColor, FavData } from "../../lib/types";
import { useAuth } from "../auth/AuthProvider";
import {
  getRemoteFavData,
  updateDbFavoriteColor,
  updateDbFavoriteCombi,
} from "../../utils/helper";

type FavoritesContextType = {
  favoriteCombinations: FavoriteCombination[];
  toggleFavoriteCombination: (id: number) => void;
  favoriteColors: FavoriteColor[];
  toggleFavoriteColor: (name: string, swatch: number) => void;
  refreshFavorites: () => void;
  syncWithDb: () => Promise<void>;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favoriteCombinations, setFavoriteCombinations] = useState<
    FavoriteCombination[]
  >([]);
  const [favoriteColors, setFavoriteColors] = useState<FavoriteColor[]>([]);

  const { idProvider } = useAuth();

  async function toggleFavoriteCombination(id: number) {
    let updated: FavoriteCombination[] = [];

    console.log("UPDATED 1: ", updated);
    setFavoriteCombinations((prev) => {
      const idx = prev.findIndex((c) => c.id === id);
      if (idx !== -1) {
        updated = [...prev];
        updated[idx] = {
          ...updated[idx],
          isFavorite: !updated[idx].isFavorite,
        };
      } else {
        updated = [...prev, { id, isFavorite: true }];
      }

      return updated;
    });

    console.log("UPDATED 2: ", updated);
    localStorage.setItem("favoriteCombinationsData", JSON.stringify(updated));

    if (idProvider) {
      await updateDbFavoriteCombi(updated);
    }
  }

  async function toggleFavoriteColor(name: string, swatch: number) {
    let updated: FavoriteColor[] = [];

    setFavoriteColors((prev) => {
      const idx = prev.findIndex((c) => c.name === name);
      if (idx !== -1) {
        updated = [...prev];
        updated[idx] = {
          ...updated[idx],
          isFavorite: !updated[idx].isFavorite,
        };
      } else {
        updated = [...prev, { name, swatch, isFavorite: true }];
      }
      return updated;
    });

    localStorage.setItem("favoriteColorsData", JSON.stringify(updated));

    if (idProvider) {
      await updateDbFavoriteColor(updated);
    }
  }

  const refreshFavorites = useCallback(() => {
    setFavoriteColors(
      JSON.parse(localStorage.getItem("favoriteColorsData") || "[]")
    );
    setFavoriteCombinations(
      JSON.parse(localStorage.getItem("favoriteCombinationsData") || "[]")
    );
  }, []);

  useEffect(() => {
    refreshFavorites();
  }, []);

  async function syncWithDb() {
    if (idProvider) {
      const favData: FavData = await getRemoteFavData(idProvider);

      localStorage.setItem(
        "favoriteColorsData",
        JSON.stringify(favData.favoriteColors)
      );

      localStorage.setItem(
        "favoriteCombinationsData",
        JSON.stringify(favData?.favoriteCombinations)
      );

      refreshFavorites();
    }
  }

  useEffect(() => {
    syncWithDb();
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        favoriteCombinations,
        toggleFavoriteCombination,
        favoriteColors,
        toggleFavoriteColor,
        refreshFavorites,
        syncWithDb,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx)
    throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
};
