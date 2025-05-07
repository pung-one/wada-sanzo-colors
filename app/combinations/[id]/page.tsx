import { createCombinationArray } from "@/utils/helper";
import { colorsWithSlug } from "@/data/colors";
import { CombinationDetail } from "@/components/CombinationDetail/CombinationDetail";

export async function generateStaticParams() {
  return createCombinationArray(colorsWithSlug).map((comb) => ({
    id: comb.id.toString(),
  }));
}

export default async function CombinationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const combination = createCombinationArray(colorsWithSlug).find(
    (comb) => comb.id.toString() === id
  );

  return <CombinationDetail combination={combination!} />;
}
