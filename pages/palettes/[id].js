import { CreatePaletteArray } from "@/utils/CreatePaletteArray";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useState } from "react";
import CopyFieldSlider from "@/components/CopyFieldSlider";
import FavoriteButton from "@/components/FavoriteButton";
import { useEffect } from "react";

const PageContainer = styled.main`
  display: flex;
  flex-direction: column;
  margin-top: 14vh;
  height: 86vh;
`;

const Heading = styled.header`
  position: relative;
  width: 100%;
  padding: 3vh;
  height: 11vh;
  border-bottom: 1px solid black;
`;

const PaletteContainer = styled.div`
  display: flex;
  height: 80vh;
  flex-direction: ${({ isLarge }) => (isLarge ? "column" : null)};
  overflow-x: hidden;
`;

const ColorBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-basis: 100%;
  background-color: ${({ hex }) => (hex ? hex : null)};
  color: ${({ hex }) => (hex ? hex : null)};
`;

export default function PalettePage({
  data,
  error,
  favoritePalettesData,
  onToggleFavoritePalette,
}) {
  const router = useRouter();
  const { id } = router.query;
  const [activeIndex, setActiveIndex] = useState(-1);
  const [currentPalette, setCurrentPalette] = useState([]);

  useEffect(() => {
    setCurrentPalette(
      CreatePaletteArray(data).find((element) => element.id == id)
    );
  }, [data, id]);

  if (error) return <h1>Failed to load data..</h1>;
  if (!data) return <h1>Loading...</h1>;

  const isLargePalette = currentPalette?.palette?.length > 2;

  const handleSlide = (index) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  const favoriteStatus = favoritePalettesData?.find(
    (palette) => palette.id === id
  );

  return (
    <PageContainer>
      <Heading>
        <FavoriteButton
          isFavorite={favoriteStatus?.isFavorite}
          isBright={true}
          isOnDetailPalette={true}
          toggleValue={id}
          onToggleFavorite={onToggleFavoritePalette}
        />
        <h1>Palette #{id}</h1>
      </Heading>
      <PaletteContainer isLarge={isLargePalette}>
        {currentPalette?.palette?.map((color, index) => {
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
