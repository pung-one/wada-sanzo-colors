export type ColorObject = {
  name: string;
  combinations: number[];
  swatch: number;
  cmyk: number[];
  lab: number[];
  rgb: number[];
  hex: string;
  isBright: boolean;
  slug: string;
};

export type CombinationObject = {
  id: number;
  combination: ColorObject[];
};

export type FavoriteColor = {
  name: string;
  isFavorite: boolean;
  swatch?: number;
};

export type FavoriteCombination = {
  id: number;
  isFavorite: boolean;
};

export type FavData = {
  updatedAt: Date;
  favoriteColors: FavoriteColor[];
  favoriteCombinations: FavoriteCombination[];
};

export type NormalizedUser = {
  name?: string;
  email: string;
  userId: string;
};

export type ValidIdProviders = "google" | "apple";

export const validProviders = ["google", "apple"];
