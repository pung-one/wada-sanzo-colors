import Link from "next/link";
import styled from "styled-components";

const ListColorBox = styled.div`
  height: 25vh;
  margin: 1vh;
  line-height: 25vh;
  color: black;
  background-color: ${({ hex }) => (hex ? hex : null)};
`;

export default function ColorsList({ colors, error }) {
  if (error) return <h1>Failed to load data..</h1>;
  if (!colors) return <h1>Loading...</h1>;

  return (
    <>
      {colors.map(({ hex, name, slug }) => {
        return (
          <Link key={name} href={`/colors/${slug}`}>
            <ListColorBox hex={hex}>{name}</ListColorBox>
          </Link>
        );
      })}
    </>
  );
}
