import { ColorPicker } from "@/components/ColorPicker/ColorPicker";
import { colorsWithSlug } from "@/data/colors";

export default function ColorPickerPage() {
  return <ColorPicker colors={colorsWithSlug} />;
}
