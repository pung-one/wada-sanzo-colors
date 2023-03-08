import styled from "styled-components";
import Button from "@/components/Button";
import useLocalStorageState from "use-local-storage-state";
import Link from "next/link";
import ColorPicker from "@/components/ColorPicker";

const Header = styled.header`
  height: 10vh;
  line-height: 10vh;
`;

const ButtonContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10vh;
  padding-top: 4vh;
  height: 90vh;
`;

const StyledLink = styled(Link)`
  background-color: white;
  color: black;
  font-size: 2vh;
  border: 1px solid black;
  padding: 5vh;
  width: 60vw;
  box-shadow: 3px 3px grey;
`;

export default function InspirationPage({ data, error }) {
  const [filter, setFilter] = useLocalStorageState("filter", {
    defaultValue: "new",
  });

  if (error) return <h1>Failed to load data..</h1>;
  if (!data) return <h1>Loading Data...</h1>;

  const randomColorSlug = data[Math.floor(Math.random() * 159)]?.slug;
  const randomPaletteId = Math.floor(Math.random() * 348);

  return (
    <>
      {filter !== "new" && (
        <button type="button" onClick={() => setFilter("new")}>
          back
        </button>
      )}
      {filter === "new" && (
        <>
          <Header>
            <h1>COLORS</h1>
          </Header>
          <ButtonContainer>
            <Button value={"Pick Rainbow Color"} setFilter={setFilter} />
            <StyledLink href={`/colors/${randomColorSlug}`}>
              Random Color
            </StyledLink>
            <StyledLink href={`/palettes/${randomPaletteId}`}>
              Random Palette
            </StyledLink>
            {/* <Button value={"Random Color"} setFilter={setFilter} />
            <Button value={"Random Palette"} setFilter={setFilter} /> */}
          </ButtonContainer>
        </>
      )}
      {filter === "Pick Rainbow Color" && (
        <ColorPicker data={data} error={error} />
      )}
      {/* {filter === "Random Color" && (
        <ColorPage
          data={data}
          error={error}
          randomSlug={randomColorSlug}
        ></ColorPage>
      )}
      {filter === "Random Palette" && (
        <PalettePage
          data={data}
          error={error}
          randomId={randomPaletteId}
        ></PalettePage>
      )} */}
    </>
  );
}
