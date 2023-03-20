import { css } from "styled-components";
import styled from "styled-components";

const FilterContainer = styled.nav`
  position: fixed;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  top: 20vh;
  width: 100%;
  height: 12vh;
  padding: 1vh 0 1vh;
  background-color: white;
  border-bottom: 1px solid black;
`;

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 1px solid black;
  height: 4vh;
  width: 30vw;
  overflow: hidden;
  box-shadow: ${({ isActive }) => (isActive ? null : "0 0 2px black")};
  transition: box-shadow 0.1s;
  &:hover {
    cursor: pointer;
  }
  ${(props) =>
    props.swatch === "red/purple"
      ? css`
          background: linear-gradient(
            90deg,
            rgba(249, 193, 206, 1) 10%,
            rgba(203, 47, 67, 1) 50%,
            rgba(100, 45, 94, 1) 90%
          );
        `
      : props.swatch === "yellow/red"
      ? css`
          background: linear-gradient(
            90deg,
            rgba(255, 242, 0, 1) 10%,
            rgba(217, 102, 41, 1) 50%,
            rgba(107, 113, 64, 1) 90%
          );
        `
      : props.swatch === "yellow/green"
      ? css`
          background: linear-gradient(
            90deg,
            rgba(199, 209, 79, 1) 10%,
            rgba(0, 180, 155, 1) 50%,
            rgba(26, 116, 68, 1) 90%
          );
        `
      : props.swatch === "blue/turquoise"
      ? css`
          background: linear-gradient(
            90deg,
            rgba(188, 228, 229, 1) 10%,
            rgba(98, 198, 191, 1) 50%,
            rgba(18, 53, 78, 1) 90%
          );
        `
      : props.swatch === "blue/purple"
      ? css`
          background: linear-gradient(
            90deg,
            rgba(181, 177, 216, 1) 10%,
            rgba(100, 80, 161, 1) 50%,
            rgba(80, 19, 69, 1) 90%
          );
        `
      : props.swatch === "white/grey/black"
      ? css`
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 1) 10%,
            rgba(162, 176, 173, 1) 50%,
            rgba(17, 19, 20, 1) 90%
          );
        `
      : /* : props.isActive
      ? css`
      background-color: black;
      ` */
        null}
  background: ${({ isActive }) => (isActive ? "black" : "")};
`;

const SwatchName = styled.span`
  color: white;
  visibility: ${({ isActive }) => (isActive ? "visible" : "hidden")};
`;

export default function ColorFilter() {
  return (
    <FilterContainer>
      <StyledButton isActive={false} swatch={"red/purple"}>
        <SwatchName isActive={false}>red/purple</SwatchName>
      </StyledButton>
      <StyledButton isActive={false} swatch={"yellow/red"}>
        <SwatchName isActive={false}>yellow/red</SwatchName>
      </StyledButton>
      <StyledButton swatch={"yellow/green"}>
        <SwatchName>yellow/green</SwatchName>
      </StyledButton>
      <StyledButton swatch={"blue/turquoise"}>
        <SwatchName>blue/turquoise</SwatchName>
      </StyledButton>
      <StyledButton swatch={"blue/purple"}>
        <SwatchName>blue/purple</SwatchName>
      </StyledButton>
      <StyledButton swatch={"white/grey/black"}>
        <SwatchName>white/grey/black</SwatchName>
      </StyledButton>
    </FilterContainer>
  );
}
