import { colorsWithSlug } from "@/data/colors";
import { createCombinationArray } from "@/utils/helper";
import LandingPage from "@/components/pageWrappers/LandingPage";

export default function Landing() {
  const combinationArray = createCombinationArray(colorsWithSlug);

  return (
    <LandingPage
      colorsWithSlug={colorsWithSlug}
      combinationArray={combinationArray}
    />
  );
}
