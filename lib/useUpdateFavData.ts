import { Dispatch, SetStateAction, useEffect } from "react";
import { FavData, FavoriteColor, FavoriteCombination } from "./types";

export async function useUpdateFavData(
  user: string,
  favDataFromDb: FavData | undefined,
  favoriteColorsData: FavoriteColor[],
  favoriteCombinationsData: FavoriteCombination[],
  setFavoriteColorsData: Dispatch<SetStateAction<FavoriteColor[]>>,
  setFavoriteCombinationsData: Dispatch<SetStateAction<FavoriteCombination[]>>
) {
  async function updateFavColors() {
    if (user !== "public") {
      const body = {
        type: "favColorUpdate",
        user: user,
        favoriteColorsData: favoriteColorsData,
      };

      const response = await fetch(`/api/favorites/`, {
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
  }

  async function updateFavCombinations() {
    if (user !== "public") {
      const body = {
        type: "favCombinationUpdate",
        user: user,
        favoriteCombinationsData: favoriteCombinationsData,
      };

      const response = await fetch(`/api/favorites/`, {
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
  }

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
  }, []);

  useEffect(() => {
    if (user !== "public") {
      updateFavColors();
    }

    localStorage.setItem(
      "favoriteColorsData",
      JSON.stringify(favoriteColorsData)
    );
  }, [favoriteColorsData]);

  useEffect(() => {
    if (user !== "public") {
      updateFavCombinations();
    }

    localStorage.setItem(
      "favoriteCombinationsData",
      JSON.stringify(favoriteCombinationsData)
    );
  }, [favoriteCombinationsData]);
}
