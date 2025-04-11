import { ColorObject } from "../../../lib/types";
import { ColorDetail } from "@/components/ColorDetail/ColorDetail";
import { colorsWithSlug } from "@/data/colors";

export function generateStaticParams() {
  return colorsWithSlug.map((color) => ({
    color: color,
  }));
}

export default function ColorPage({
  params,
}: {
  params: { color: ColorObject };
}) {
  return <ColorDetail colorObject={params.color} />;
}
