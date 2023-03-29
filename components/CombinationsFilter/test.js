import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CombinationsFilter from ".";

const favoriteCombinationsData = [];

test("shows filter button", () => {
  render(
    <CombinationsFilter favoriteCombinationsData={favoriteCombinationsData} />
  );
  const button = screen.getAllByRole("button");
  expect(button[0]).toBeInTheDocument();
  expect(button[1]).toBeInTheDocument();
  expect(button[2]).toBeInTheDocument();
});
