import Link from "next/link";
import styled from "styled-components";

const ColorBox = styled.div`
  height: 15vh;
  margin: 1vh;
  line-height: 15vh;
  color: black;
`;

export default function ColorsList({ colors }) {
  return (
    <>
      <h1>Colors</h1>
      <hr />
      {colors.map(({ slug, hex, name }) => {
        return (
          <Link key={hex} href={`/colors/${slug}`}>
            <ColorBox
              style={{
                backgroundColor: `${hex}`,
              }}
            >
              {name}
            </ColorBox>
          </Link>
        );
      })}
    </>
  );
}
