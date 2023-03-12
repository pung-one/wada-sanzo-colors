import Link from "next/link";
import styled from "styled-components";
import { IsColorBright } from "@/utils/IsColorBright";

const List = styled.ul`
  padding: 0;
  list-style: none;
  list-style-type: 0;
`;

const ColorBox = styled.li`
  height: 25vh;
  margin-top: 2vh;
  line-height: 25vh;
  background-color: ${({ hex }) => (hex ? hex : null)};
  color: ${({ isBright }) => (isBright ? "black" : "white")};
`;

export default function ColorsList({ colors, error }) {
  if (error) return <h1>Failed to load data..</h1>;
  if (!colors) return <h1>Loading...</h1>;

  return (
    <List>
      {colors.map(({ name, slug, rgb, hex }) => {
        return (
          <Link
            aria-label={`got to color ${name}`}
            key={name}
            href={`/colors/${slug}`}
          >
            <ColorBox isBright={IsColorBright(rgb) > 130} hex={hex}>
              {name}
            </ColorBox>
          </Link>
        );
      })}
    </List>
  );
}
