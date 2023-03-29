import styled from "styled-components";

export default function TabBar({ onShowColors, onShowCombinations, listType }) {
  return (
    <TabContainer>
      <StyledButton
        type="button"
        isActive={listType === "colors"}
        onClick={() => onShowColors()}
      >
        Colors
      </StyledButton>
      <StyledButton
        type="button"
        isActive={listType === "combinations"}
        onClick={() => onShowCombinations()}
      >
        Combinations
      </StyledButton>
    </TabContainer>
  );
}

const TabContainer = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 6vh;
  padding: 1vh 0 1vh;
  background-color: white;
  border-bottom: 1px solid black;
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid black;
  font-size: 1.8vh;
  height: 4vh;
  width: 45vw;
  box-shadow: ${({ isActive }) => (isActive ? null : "0 0 2px black")};
  background-color: ${({ isActive }) => (isActive ? "black" : "white")};
  color: ${({ isActive }) => (isActive ? "white" : "black")};
  transition: box-shadow 0.1s;
  &:hover {
    cursor: pointer;
  }
`;
