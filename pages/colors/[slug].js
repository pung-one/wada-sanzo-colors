import { useRouter } from "next/router";
import styled from "styled-components";
import SpecificPaletteList from "@/components/SpecificPaletteList/SpecificPaletteList";
import CopyField from "@/components/CopyField";

const StyledColorBox = styled.div`
  height: 25vh;
  background-color: ${({ hex }) => (hex ? hex : null)};
`;

export default function ColorPage({ data, error }) {
  const router = useRouter();
  const { slug } = router.query;

  if (error) return <h1>Failed to load data..</h1>;

  const currentColor = data?.find((color) => color.slug === slug);

  if (!currentColor) return <h1>Loading...</h1>;

  const { name, hex, cmyk, rgb, lab } = currentColor;

  function handleCopy(text) {
    navigator.clipboard.writeText(text);
  }

  return (
    <>
      <StyledColorBox hex={hex}>
        <h1>{name}</h1>
        <CopyField label={"HEX: "} value={hex} onClick={handleCopy} />
        <CopyField label={"RGB: "} value={rgb} onClick={handleCopy} />
        <CopyField label={"CMYK: "} value={cmyk} onClick={handleCopy} />
        <CopyField label={"LAB: "} value={lab} onClick={handleCopy} />
      </StyledColorBox>
      <SpecificPaletteList currentColor={currentColor} colors={data} />
    </>
  );
}
