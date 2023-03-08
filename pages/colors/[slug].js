import { useRouter } from "next/router";
import styled from "styled-components";
import SpecificPaletteList from "@/components/SpecificPaletteList/SpecificPaletteList";
import CopyField from "@/components/CopyField";

const StyledColorBox = styled.div`
  height: 25vh;
  background-color: ${({ hex }) => (hex ? hex : null)};
`;

export default function ColorPage({ data, error, randomSlug }) {
  const router = useRouter();
  const { slug } = router.query;
  let currentColor;

  if (error) return <h1>Failed to load data..</h1>;
  if (!data) return <h1>Loading..</h1>;

  console.log(randomSlug);

  if (randomSlug) {
    currentColor = data?.find((color) => color.slug === randomSlug);
  } else {
    currentColor = data?.find((color) => color.slug === slug);
  }

  if (!currentColor) return <h1>Loading...</h1>;

  const { name, hex, cmyk, rgb, lab } = currentColor;

  return (
    <>
      <StyledColorBox hex={hex}>
        <h1>{name}</h1>
        <CopyField label={"HEX: "} value={hex} />
        <CopyField label={"RGB: "} value={rgb} />
        <CopyField label={"CMYK: "} value={cmyk} />
        <CopyField label={"LAB: "} value={lab} />
      </StyledColorBox>
      <SpecificPaletteList currentColor={currentColor} colors={data} />
    </>
  );
}
