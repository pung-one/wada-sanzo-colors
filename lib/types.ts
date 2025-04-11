export type ColorObject = {
  name: string;
  combinations: number[];
  swatch: number;
  cmyk: number[];
  lab: number[];
  rgb: number[];
  hex: string;
  slug?: string;
};

export type CombinationObject = {
  id: number;
  combination: ColorObject[];
};
