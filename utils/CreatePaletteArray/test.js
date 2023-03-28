import { CreatePaletteArray } from ".";
import { colorsWithSlug } from "../../data/colors";

describe("CreatePalettesArray", () => {
  test("should return an array with length 348", () => {
    const data = colorsWithSlug;

    const result = CreatePaletteArray(data);

    expect(result).toHaveLength(348);
  });
});
