import { CreateCombinationArray } from ".";
import { colorsWithSlug } from "../../data/colors";

describe("CreateCombinationsArray", () => {
  test("should return an array with length 348", () => {
    const data = colorsWithSlug;

    const result = CreateCombinationArray(data);

    expect(result).toHaveLength(348);
  });
});
