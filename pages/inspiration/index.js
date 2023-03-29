import styled from "styled-components";
import Link from "next/link";
import ColorPicker from "@/components/ColorPicker";
import { CreatePaletteArray } from "@/utils/CreatePaletteArray";

const PageContainer = styled.main`
  display: flex;
  flex-direction: column;
  top: 6.5vh;
  height: 100vh;
`;

const ButtonContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding-top: 45%;
  gap: 10vh;
  background: ${({ background }) => (background ? background : null)};
`;

const StyledButton = styled.button`
  background-color: white;
  border: 1px solid black;
  padding: 5vh;
  width: 60vw;
  box-shadow: 0 0 4px black;
  &:hover {
    cursor: pointer;
  }
`;

const StyledLink = styled(Link)`
  background-color: white;
  border: 1px solid black;
  padding: 5vh;
  width: 60vw;
  text-align: center;
  box-shadow: 0 0 4px black;
`;

export default function InspirationPage({
  data,
  error,
  inspirationPageFilter,
  setInspirationPageFilter,
}) {
  if (error) return <h1>Failed to load data..</h1>;
  if (!data) return <h1>Loading Data...</h1>;

  const randomColorSlug = data[Math.floor(Math.random() * 159)]?.slug;
  const randomPaletteId = Math.floor(Math.random() * 348);

  const paletteArray = CreatePaletteArray(data);

  function CreateRandomPaletteCssGradient() {
    const randomPalette = paletteArray[randomPaletteId].palette;
    if (randomPalette.length === 2) {
      const randomGradient = `linear-gradient(180deg, rgba(${randomPalette[0].rgb[0]},${randomPalette[0].rgb[1]},${randomPalette[0].rgb[2]},1) 0%, rgba(${randomPalette[1].rgb[0]},${randomPalette[1].rgb[1]},${randomPalette[1].rgb[2]},1) 100%)`;
      return randomGradient;
    } else if (randomPalette.length === 3) {
      const randomGradient = `linear-gradient(180deg, rgba(${randomPalette[0].rgb[0]},${randomPalette[0].rgb[1]},${randomPalette[0].rgb[2]},1) 0%, rgba(${randomPalette[1].rgb[0]},${randomPalette[1].rgb[1]},${randomPalette[1].rgb[2]},1) 50%, rgba(${randomPalette[2].rgb[0]},${randomPalette[2].rgb[1]},${randomPalette[2].rgb[2]},1) 100%)`;
      return randomGradient;
    } else {
      const randomGradient = `linear-gradient(180deg, rgba(${randomPalette[0].rgb[0]},${randomPalette[0].rgb[1]},${randomPalette[0].rgb[2]},1) 0%, rgba(${randomPalette[1].rgb[0]},${randomPalette[1].rgb[1]},${randomPalette[1].rgb[2]},1) 25%, rgba(${randomPalette[2].rgb[0]},${randomPalette[2].rgb[1]},${randomPalette[2].rgb[2]},1) 75%, rgba(${randomPalette[3].rgb[0]},${randomPalette[3].rgb[1]},${randomPalette[3].rgb[2]},1) 100%)`;
      return randomGradient;
    }
  }
  const randomGradient = CreateRandomPaletteCssGradient();

  return (
    <PageContainer>
      {inspirationPageFilter === "initialPage" && (
        <ButtonContainer background={randomGradient}>
          <StyledButton
            onClick={() => setInspirationPageFilter("Pick Rainbow Color")}
          >
            Pick Rainbow Color
          </StyledButton>
          <StyledLink href={`/colors/${randomColorSlug}`}>
            Random Color
          </StyledLink>
          <StyledLink href={`/palettes/${randomPaletteId}`}>
            Random Palette
          </StyledLink>
        </ButtonContainer>
      )}
      {inspirationPageFilter === "Pick Rainbow Color" && (
        <ColorPicker data={data} error={error} />
      )}
    </PageContainer>
  );
}
