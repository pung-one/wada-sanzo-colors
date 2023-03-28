import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ColorFilter from ".";

const favoriteColorsData = [];

test("shows filter button", () => {
  render(<ColorFilter favoriteColorsData={favoriteColorsData} />);
  const swatchButton2 = screen.getByText("yellow/red");
  expect(swatchButton2).toBeInTheDocument();
});
