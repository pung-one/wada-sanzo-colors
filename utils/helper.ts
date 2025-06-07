import { ColorObject, FavoriteColor, FavoriteCombination } from "@/lib/types";

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

export async function getRemoteFavData() {
  try {
    const response = await fetch(`/api/favorites`);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error(response.status);
    }
  } catch (e) {
    console.error(e);
  }
}

export async function updateDbFavoriteColor(
  favoriteColorsData: FavoriteColor[]
) {
  const body = {
    type: "favColorUpdate",
    favoriteColorsData: favoriteColorsData,
  };

  const response = await fetch(`/api/favorites`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    await response.text();
  } else {
    console.error(response.status);
  }
}

export async function updateDbFavoriteCombi(
  favoriteCombinationsData: FavoriteCombination[]
) {
  const body = {
    type: "favCombinationUpdate",
    favoriteCombinationsData: favoriteCombinationsData,
  };

  const response = await fetch(`/api/favorites`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    await response.text();
  } else {
    console.error(response.status);
  }
}
