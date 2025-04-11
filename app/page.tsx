import { colorsWithSlug } from "@/data/colors";
import { createCombinationArray } from "@/utils/helper";
import HomePage from "@/components/pageWrappers/HomePage";

export default function Home() {
  const combinationArray = createCombinationArray(colorsWithSlug);

  return (
    <HomePage
      colorsWithSlug={colorsWithSlug}
      combinationArray={combinationArray}
    />
  );
}
