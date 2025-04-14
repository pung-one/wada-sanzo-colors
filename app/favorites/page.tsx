import { Favorites } from "@/components/Favorites/Favorites";
import { colorsWithSlug } from "@/data/colors";

export default function FavoritesPage() {
  return <Favorites colors={colorsWithSlug} />;
}
