import { createContext } from "react";

export type ContextProps = {
  setUser: (val: string) => void;
  listType: string;
  combinationListType: number;
  colorListType: number;
  inspirationPageFilter: string;
  setInspirationPageFilter: (val: string) => void;
  favoriteColorsData: any[];
  onToggleFavoriteColor: (colorName: any, colorSwatch: any) => void;
  favoriteCombinationsData: any[];
  onToggleFavoriteCombination: (id: string) => void;
};

export const ActionContext = createContext<ContextProps | null>(null);
