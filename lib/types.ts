import { ObjectId } from "mongodb";

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
  _id: ObjectId;
  user?: string;
  name?: string;
  email?: string;
  idProvider?: string;
  favoriteColors: FavoriteColor[];
  favoriteCombinations: FavoriteCombination[];
};
