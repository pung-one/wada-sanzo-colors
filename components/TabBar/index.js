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
  height: 9vh;
  padding: 1vh 0 1vh;
  background-color: white;
  border-bottom: 1px solid black;
  @media screen and (min-width: 1024px), screen and (orientation: landscape) {
    height: 100%;
    flex-direction: column;
    padding: 0;
    border-bottom: none;
  }
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid black;
  height: 6vh;
  width: 45%;
  box-shadow: ${({ isActive }) => (isActive ? null : "0 0 2px black")};
  background-color: ${({ isActive }) => (isActive ? "black" : "white")};
  color: ${({ isActive }) => (isActive ? "white" : "black")};
  &:hover {
    cursor: pointer;
  }
  @media screen and (min-width: 1024px), screen and (orientation: landscape) {
    width: 90%;
    height: 6vh;
    margin-left: 10%;
    border: none;

    box-shadow: none;
    box-shadow: none;
    background-color: white;
    color: black;
    border-bottom: 1px solid black;
    border-left: 1px solid black;
  }
`;
