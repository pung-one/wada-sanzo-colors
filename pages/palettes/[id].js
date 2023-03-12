import { CreatePaletteArray } from "@/utils/CreatePaletteArray";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useState } from "react";
import CopyFieldSlider from "@/components/CopyFieldSlider";

const PageContainer = styled.main`
  display: flex;
  flex-direction: column;
  height: 89vh;
  margin-bottom: 11vh;
`;

const Heading = styled.header`
  width: 100%;
  padding: 3vh;
  border-bottom: 1px solid black;
`;

const PaletteContainer = styled.div`
  display: flex;
  flex-direction: ${({ isLarge }) => (isLarge ? "column" : null)};
  flex-grow: 1;
  overflow-x: hidden;
`;

const ColorBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
      <Heading>
        <h1>Palette #{id}</h1>
      </Heading>
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
