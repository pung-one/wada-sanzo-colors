import { ColorObject, FavoriteColor, FavoriteCombination } from "@/lib/types";
import { Session } from "next-auth";

export function createCombinationArray(data: ColorObject[]) {
  let combinationArray = [];
  for (let i = 1; i <= 348; i++) {
    const combination = {
      id: i,
      combination: data?.filter((color) =>
        color.combinations.some((combi) => combi === i)
      ),
    };
    combinationArray.push(combination);
  }
  return combinationArray;
}

export function isColorBright(rgb: number[]) {
  const r = rgb[0];
  const g = rgb[1];
  const b = rgb[2];
  const brightness = Math.sqrt(r * r * 0.241 + g * g * 0.691 + b * b * 0.068);
  if (brightness > 120) {
    return true;
  } else {
    return false;
  }
}

export async function updateDbFavoriteColor(
  session: Session | null,
  favoriteColorsData: FavoriteColor[]
) {
  if (session) {
    const body = {
      idProvider: session.idProvider,
      type: "favColorUpdate",
      favoriteColorsData: favoriteColorsData,
    };

    const response = await fetch(`/api/favorites`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${session.id_token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      await response.text();
    } else {
      console.error(response.status);
    }
  }
}

export async function updateDbFavoriteCombi(
  session: Session | null,
  favoriteCombinationsData: FavoriteCombination[]
) {
  if (session) {
    const body = {
      idProvider: session.idProvider,
      type: "favCombinationUpdate",
      favoriteCombinationsData: favoriteCombinationsData,
    };

    const response = await fetch(`/api/favorites`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${session.id_token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      await response.text();
    } else {
      console.error(response.status);
    }
  }
}
