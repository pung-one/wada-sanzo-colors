import { colorsWithSlug } from "@/data/colors";
import { createCombinationArray } from "@/utils/helper";
import LandingPage from "@/components/Landing/LandingPage";

export default function Landing() {
  const combinationArray = createCombinationArray(colorsWithSlug);

  return (
    <LandingPage colors={colorsWithSlug} combinations={combinationArray} />
  );
}
