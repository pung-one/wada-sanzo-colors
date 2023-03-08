import { CreatePaletteArray } from "@/utils/CreatePaletteArray";
import { useRouter } from "next/router";
import styled from "styled-components";
import CopyField from "@/components/CopyField";
import Link from "next/link";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Heading = styled.h1`
  width: 100%;
  padding: 3vh;
`;

const PaletteContainer = styled.div`
  display: flex;
  height: 100%;
`;

const CopyFieldContainer = styled.div`
  visibility: hidden;
  align-self: center;
`;

const ColorBox = styled(Link)`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  padding-top: 4vh;
  background-color: ${({ hex }) => (hex ? hex : null)};
  color: ${({ hex }) => (hex ? hex : null)};
  &:hover {
    color: white;
  }
  &:hover ${CopyFieldContainer} {
    visibility: visible;
  }
`;

export default function PalettePage({ data, error, randomId }) {
  const router = useRouter();
  const { id } = router.query;
  let currentPalette;

  if (error) return <h1>Failed to load data..</h1>;
  if (!data) return <h1>Loading...</h1>;

  const paletteArray = CreatePaletteArray(data);
  if (randomId) {
    currentPalette = paletteArray?.find((arr, i) => i === randomId - 1);
  } else {
    currentPalette = paletteArray?.find((arr, i) => i === id - 1);
  }

  return (
    <PageContainer>
      <Heading>Palette #{id}</Heading>
      <hr />
      <PaletteContainer>
        {currentPalette?.map(({ name, hex, cmyk, rgb, lab, slug }) => {
          return (
            <ColorBox hex={hex} key={name} href={`/colors/${slug}`}>
              <p>{name}</p>
              <CopyFieldContainer>
                <CopyField label={"HEX: "} value={hex} />
                <CopyField label={"RGB: "} value={rgb} />
                <CopyField label={"CMYK: "} value={cmyk} />
                <CopyField label={"LAB: "} value={lab} />
              </CopyFieldContainer>
            </ColorBox>
          );
        })}
      </PaletteContainer>
    </PageContainer>
  );
}
