import styled, { css } from "styled-components";

const TabContainer = styled.nav`
  display: flex;
  justify-content: center;
  height: 12vh;
`;

const StyledButton = styled.button`
  background-color: white;
  width: 100%;
  border: 1px solid black;
  margin: 2vw 1vw 0 1vw;
  box-shadow: ${({ isActive }) => (isActive ? null : "0 2px 5px grey")};
`;

export default function TabBar({ onShowColors, onShowPalettes, listType }) {
  return (
    <TabContainer>
      <StyledButton
        type="button"
        isActive={listType === "colors"}
        onClick={() => onShowColors()}
      >
        COLORS
      </StyledButton>
      <StyledButton
        type="button"
        isActive={listType === "palettes"}
        onClick={() => onShowPalettes()}
      >
        PALETTES
      </StyledButton>
    </TabContainer>
  );
}
