import useLocalStorageState from "use-local-storage-state";
import styled from "styled-components";
import ColorsList from "@/components/ColorsList";
import TabBar from "@/components/TabBar";
import PalettesList from "@/components/PalettesList";

const ListContainer = styled.div`
  margin: 2px;
`;

export default function Home({ error, data }) {
  const [listType, setListType] = useLocalStorageState("listType", {
    defaultValue: "colors",
  });

  function handleShowColors() {
    setListType("colors");
  }

  function handleShowPalettes() {
    setListType("palettes");
  }

  return (
    <main>
      <ListContainer>
        <TabBar
          onShowColors={handleShowColors}
          onShowPalettes={handleShowPalettes}
          listType={listType}
        />
        {listType === "colors" ? (
          <ColorsList colors={data} error={error} />
        ) : (
          <PalettesList data={data} error={error} />
        )}
      </ListContainer>
    </main>
  );
}
