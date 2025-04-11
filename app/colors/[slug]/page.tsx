import { ColorDetail } from "@/components/pageWrappers/ColorDetail";
import { colorsWithSlug } from "@/data/colors";

export async function generateStaticParams() {
  return colorsWithSlug.map((color) => ({
    slug: color.slug,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const color = colorsWithSlug.find((color) => color.slug === slug);

  return <ColorDetail colorObject={color!} />;
}
