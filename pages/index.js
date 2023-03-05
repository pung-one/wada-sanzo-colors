import ColorsList from "@/components/ColorsList";
import styled from "styled-components";

export default function Home({ colors }) {
  return (
    <main>
      <ColorsList colors={colors} />
    </main>
  );
}
