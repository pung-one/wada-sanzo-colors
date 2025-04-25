import { ColorObject } from "@/lib/types";

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

export async function toggleFavoriteColor(colorName: string, user?: string) {
  const stored = localStorage.getItem("favoriteColorsData") || "[]";
  const favoriteColorsData: any[] = JSON.parse(stored);

  const index = favoriteColorsData.findIndex((c) => c.name === colorName);

  if (index !== -1) {
    favoriteColorsData[index].isFavorite =
      !favoriteColorsData[index].isFavorite;
  } else {
    favoriteColorsData.push({ name: colorName, isFavorite: true });
  }

  localStorage.setItem(
    "favoriteColorsData",
    JSON.stringify(favoriteColorsData)
  );

  if (user !== "public") {
    const body = {
      type: "favColorUpdate",
      user: user,
      colorName: colorName,
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

export async function toggleFavoriteCombination(
  combiId: number,
  user?: string
) {
  const stored = localStorage.getItem("favoriteCombinationsData") || "[]";
  const favoriteCombinationsData: any[] = JSON.parse(stored);

  const index = favoriteCombinationsData.findIndex((c) => c.id === combiId);

  if (index !== -1) {
    favoriteCombinationsData[index].isFavorite =
      !favoriteCombinationsData[index].isFavorite;
  } else {
    favoriteCombinationsData.push({ id: combiId, isFavorite: true });
  }

  localStorage.setItem(
    "favoriteCombinationsData",
    JSON.stringify(favoriteCombinationsData)
  );

  if (user !== "public") {
    const body = {
      type: "favCombinationUpdate",
      user: user,
      id: combiId,
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
