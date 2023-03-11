import Link from "next/link";
import styled from "styled-components";

const List = styled.ul`
  padding: 0;
  list-style-type: 0;
`;

const ColorBox = styled.li`
  height: 25vh;
  margin: 1vh;
  line-height: 25vh;
  background-color: ${({ hex }) => (hex ? hex : null)};
`;

export default function ColorsList({ colors, error }) {
  if (error) return <h1>Failed to load data..</h1>;
  if (!colors) return <h1>Loading...</h1>;

  return (
    <List>
      {colors.map(({ hex, name, slug }) => {
        return (
          <Link key={name} href={`/colors/${slug}`}>
            <ColorBox hex={hex}>{name}</ColorBox>
          </Link>
        );
      })}
    </List>
  );
}
