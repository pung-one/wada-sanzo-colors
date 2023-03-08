import styled from "styled-components";
import Button from "@/components/Button";
import useLocalStorageState from "use-local-storage-state";
import ColorPage from "../colors/[slug]";
import Link from "next/link";
import PalettePage from "../palettes/[id]";

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
  border: 1px solid black;
  padding: 5vh;
  width: 60vw;
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
            <Button value={"Random Color"} setFilter={setFilter} />
            <Button value={"Random Palette"} setFilter={setFilter} />
            <Button value={"Pick Rainbow Color"} setFilter={setFilter} />
          </ButtonContainer>
        </>
      )}
      {filter === "Random Color" && (
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
      )}
    </>
  );
}
