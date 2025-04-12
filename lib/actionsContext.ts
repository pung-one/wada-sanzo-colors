import { createContext } from "react";
import { FavoriteColor, FavoriteCombination } from "./types";

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
