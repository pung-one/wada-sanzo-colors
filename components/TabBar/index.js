import styled, { css } from "styled-components";

const TabContainer = styled.nav`
  display: flex;
  position: fixed;
  bottom: 11vh;
  width: 100%;
  height: 7vh;
  justify-content: space-evenly;
  padding: 1vh;
  border-top: 1px solid black;

  background-color: white;
`;

const StyledButton = styled.button`
  background-color: white;
  border: 1px solid black;
  width: 40%;
  padding: 1vh;
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
