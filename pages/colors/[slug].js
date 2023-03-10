import { useRouter } from "next/router";
import styled from "styled-components";
import SpecificPaletteList from "@/components/SpecificPaletteList/SpecificPaletteList";
import CopyFieldSlider from "@/components/CopyFieldSlider";
import { useState } from "react";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 89vh;
`;

const StyledColorBox = styled.div`
  height: 30vh;
  display: flex;
  padding: 3vh;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  overflow-x: hidden;
  background-color: ${({ hex }) => (hex ? hex : null)};
`;

export default function ColorPage({ data, error }) {
  const router = useRouter();
  const { slug } = router.query;
  const [isActive, setIsActive] = useState(false);

  let currentColor;

  if (error) return <h1>Failed to load data..</h1>;
  if (!data) return <h1>Loading..</h1>;

  currentColor = data?.find((color) => color.slug === slug);

  if (!currentColor) return <h1>Loading...</h1>;

  const { name, hex } = currentColor;

  function handleSlide() {
    setIsActive(!isActive);
  }

  return (
    <PageContainer>
      <StyledColorBox hex={hex}>
        <h1>{name}</h1>
        <CopyFieldSlider
          color={currentColor}
          isLargePalette={true}
          isActive={isActive}
          handleSlide={handleSlide}
          needColorName={false}
        />
      </StyledColorBox>
      <SpecificPaletteList currentColor={currentColor} colors={data} />
    </PageContainer>
  );
}
