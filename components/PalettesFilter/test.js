import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import PalettesFilter from ".";

const favoritePalettesData = [];

test("shows filter button", () => {
  render(<PalettesFilter favoritePalettesData={favoritePalettesData} />);
  const button = screen.getAllByRole("button");
  expect(button[0]).toBeInTheDocument();
  expect(button[1]).toBeInTheDocument();
  expect(button[2]).toBeInTheDocument();
});
