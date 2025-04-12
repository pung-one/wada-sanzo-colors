import { Inspiration } from "@/components/Inspiration/Inspiration";
import { colorsWithSlug } from "@/data/colors";

export default function InspirationPage() {
  return <Inspiration colors={colorsWithSlug} />;
}
