import styled, { css } from "styled-components";

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 10vh;
  margin-bottom: none;
`;

const StyledButton = styled.button`
  background-color: white;
  width: 100%;
  border: 1px solid black;
  margin: 1px;
  ${(props) =>
    props.isActive &&
    css`
      border-bottom: none;
    `}
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
