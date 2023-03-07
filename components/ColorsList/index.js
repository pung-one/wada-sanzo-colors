import Link from "next/link";
import styled from "styled-components";

const ListColorBox = styled.div`
  height: 15vh;
  margin: 1vh;
  line-height: 15vh;
  color: black;
  background-color: ${({ hex }) => (hex ? hex : null)};
`;

export default function ColorsList({ colors }) {
  return (
    <>
      <h1>Colors</h1>
      <hr />
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
