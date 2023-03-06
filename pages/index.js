import ColorsList from "@/components/ColorsList";
import styled from "styled-components";

export default function Home({ error, data }) {
  if (error) return <h1>Failed to load data..</h1>;
  if (!data) return <h1>Loading...</h1>;

  const colorsWithSlug = data.map((color) => {
    return {
      ...color,
      slug: color.name.toLocaleLowerCase().split(" ").join("-"),
    };
  });

  return (
    <main>
      <ColorsList colors={colorsWithSlug} />
    </main>
  );
}
