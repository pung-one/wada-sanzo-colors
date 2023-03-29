import { IsColorBright } from ".";
import { colorsWithSlug } from "../../data/colors";

describe("IsColorBright", () => {
  test("should return true when called with bright color", () => {
    const brightColor = colorsWithSlug.find(
      (color) => color.name === "Fresh Color"
    );

    const result = IsColorBright(brightColor.rgb);

    expect(result).toBe(true);
  });

  test("should return false when called with dark color", () => {
    const brightColor = colorsWithSlug.find(
      (color) => color.name === "Dark Soft Violet"
    );

    const result = IsColorBright(brightColor.rgb);

    expect(result).toBe(false);
  });
});
