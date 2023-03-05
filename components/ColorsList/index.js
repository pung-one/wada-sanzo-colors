import Link from "next/link";
import styled from "styled-components";

const StyledLink = styled(Link)``;

export default function ColorsList({ colors }) {
  return (
    <>
      <h1 style={{ padding: "3vh" }}>Colors</h1>
      <hr />
      {colors.map(({ slug, hex, name }) => {
        return (
          <StyledLink key={hex} href={`/colors/${slug}`}>
            <div
              style={{
                backgroundColor: `${hex}`,
                height: "15vh",
                margin: "1vh",
                lineHeight: "15vh",
                color: "black",
              }}
            >
              {name}
            </div>
          </StyledLink>
        );
      })}
    </>
  );
}
