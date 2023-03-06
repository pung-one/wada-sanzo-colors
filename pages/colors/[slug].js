import { useRouter } from "next/router";
import SpecificPaletteList from "@/components/SpecificPaletteList/SpecificPaletteList";

export default function ColorPage({ colors }) {
  const router = useRouter();
  const { slug } = router.query;

  const currentColor = colors.find((color) => color.slug === slug);

  return (
    <>
      <div
        style={{
          height: "25vh",
          backgroundColor: `${currentColor?.hex}`,
          width: "100%",
        }}
      >
        {currentColor?.name}
      </div>
      <SpecificPaletteList currentColor={currentColor} colors={colors} />
    </>
  );
}
