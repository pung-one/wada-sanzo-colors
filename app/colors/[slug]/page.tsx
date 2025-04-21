import { ColorDetail } from "@/components/ColorDetail/ColorDetail";
import { colorsWithSlug } from "@/data/colors";

export async function generateStaticParams() {
  return colorsWithSlug.map((color) => ({
    slug: color.slug,
  }));
}

export default async function ColorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const color = colorsWithSlug.find((color) => color.slug === slug);

  const combinations = color?.combinations.map((id1) => {
    return {
      id: id1,
      colors: colorsWithSlug.filter((color) =>
        color.combinations.some((id2) => id1 === id2)
      ),
    };
  });

  return <ColorDetail colorObject={color} combinations={combinations} />;
}
