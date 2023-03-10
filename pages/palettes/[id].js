import { CreatePaletteArray } from "@/utils/CreatePaletteArray";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useState } from "react";
import CopyFieldSlider from "@/components/CopyFieldSlider";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 89vh;
`;

const Heading = styled.h1`
  width: 100%;
  padding: 3vh;
`;

const PaletteContainer = styled.div`
  display: flex;
  flex-direction: ${({ isLarge }) => (isLarge ? "column" : null)};
  height: 100%;
  overflow-x: hidden;
`;

const ColorBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  padding: 1% 0 1%;
  background-color: ${({ hex }) => (hex ? hex : null)};
  color: ${({ hex }) => (hex ? hex : null)};
`;

export default function PalettePage({ data, error, randomId }) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const router = useRouter();
  const { id } = router.query;

  let currentPalette;

  if (error) return <h1>Failed to load data..</h1>;
  if (!data) return <h1>Loading...</h1>;

  const paletteArray = CreatePaletteArray(data);

  currentPalette = paletteArray?.find((arr, i) => i === id - 1);

  const isLargePalette = currentPalette?.length > 2;

  const handleSlide = (index) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  return (
    <PageContainer>
      <Heading>Palette #{id}</Heading>
      <hr />
      <PaletteContainer isLarge={isLargePalette}>
        {currentPalette?.map((color, index) => {
          return (
            <ColorBox hex={color.hex} key={color.name}>
              <CopyFieldSlider
                isLargePalette={isLargePalette}
                color={color}
                index={index}
                handleSlide={handleSlide}
                isActive={index === activeIndex}
                needColorName={true}
              />
            </ColorBox>
          );
        })}
      </PaletteContainer>
    </PageContainer>
  );
}
