import { useRouter } from "next/router";
import styled from "styled-components";
import SpecificPaletteList from "@/components/SpecificPaletteList/SpecificPaletteList";

export default function ColorPage({ data, error }) {
  const router = useRouter();
  const { slug } = router.query;

  if (error) return <h1>Failed to load data..</h1>;
  if (!data) return <h1>Loading...</h1>;

  const currentColor = data.find((color) => color.slug === slug);

  const StyledColorBox = styled.div`
    height: 25vh;
    background-color: ${({ hex }) => (hex ? hex : null)};
  `;

  return (
    <>
      <StyledColorBox hex={currentColor?.hex}>
        {currentColor?.name}
      </StyledColorBox>
      <SpecificPaletteList currentColor={currentColor} colors={data} />
    </>
  );
}
