import { useRouter } from "next/router";
import styled from "styled-components";
import SpecificPaletteList from "@/components/SpecificPaletteList/SpecificPaletteList";
import CopyFieldSlider from "@/components/CopyFieldSlider";
import { useState } from "react";
import { IsColorBright } from "@/utils/IsColorBright";

const PageContainer = styled.main`
  display: flex;
  flex-direction: column;
  margin-bottom: 11vh;
`;

const StyledColorBox = styled.header`
  height: 33vh;
  display: flex;
  padding: 3vh;
  align-items: center;
  flex-direction: column;
  overflow-x: hidden;
  background-color: ${({ hex }) => (hex ? hex : null)};
`;

const StyledHeadline = styled.h1`
  color: ${({ isBright }) => (isBright ? "black" : "white")};
`;

export default function ColorPage({ data, error }) {
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();
  const { slug } = router.query;

  let currentColor;

  if (error) return <h1>Failed to load data..</h1>;
  if (!data) return <h1>Loading..</h1>;

  currentColor = data?.find((color) => color.slug === slug);

  if (!currentColor) return <h1>Loading...</h1>;

  const { name, hex, rgb } = currentColor;

  function handleSlide() {
    setIsActive(!isActive);
  }

  return (
    <PageContainer>
      <StyledColorBox hex={hex}>
        <StyledHeadline isBright={IsColorBright(rgb) > 130}>
          {name}
        </StyledHeadline>
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
