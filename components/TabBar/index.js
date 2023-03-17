import styled, { css } from "styled-components";
import { MdKeyboardArrowDown } from "react-icons/md";

const TabContainer = styled.nav`
  position: fixed;
  display: flex;
  justify-content: space-around;
  align-items: center;
  top: 12vh;
  width: 100%;
  height: 7vh;
  background-color: white;
  border-bottom: 1px solid black;
`;

const StyledButton = styled.button`
  background-color: white;
  border: 1px solid black;
  padding: 1vh 2vw 1vh;
  font-size: 1.8vh;
  width: 40vw;
  box-shadow: ${({ isActive }) => (isActive ? null : "0 0 2px black")};
  background-color: ${({ isActive }) => (isActive ? "black" : "white")};
  color: ${({ isActive }) => (isActive ? "white" : "black")};
  transition: box-shadow 0.1s;
  &:hover {
    cursor: pointer;
  }
`;

export default function TabBar({ onShowColors, onShowPalettes, listType }) {
  return (
    <TabContainer>
      <StyledButton
        type="button"
        isActive={listType === "colors"}
        onClick={() => onShowColors()}
      >
        Colors
        {/* {listType === "colors" && <MdKeyboardArrowDown />} */}
      </StyledButton>
      <StyledButton
        type="button"
        isActive={listType === "palettes"}
        onClick={() => onShowPalettes()}
      >
        Palettes
        {/* {listType === "palettes" && <MdKeyboardArrowDown />} */}
      </StyledButton>
    </TabContainer>
  );
}
