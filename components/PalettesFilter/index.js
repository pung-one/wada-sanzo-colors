import styled from "styled-components";

const FilterContainer = styled.nav`
  position: fixed;
  display: flex;
  justify-content: space-around;
  align-items: center;
  top: 19vh;
  width: 100%;
  height: 7vh;
  background-color: white;
  border-bottom: 1px solid black;
`;

const StyledButton = styled.button`
  display: flex;
  background-color: white;
  border: 1px solid black;
  width: 25vw;
  height: 4.6vh;
  overflow: hidden;
  box-shadow: ${({ isActive }) => (isActive ? null : "0 0 2px black")};
  background-color: ${({ isActive }) => (isActive ? "black" : "white")};
  color: ${({ isActive }) => (isActive ? "white" : "black")};
  transition: box-shadow 0.1s;
  &:hover {
    cursor: pointer;
  }
`;

const StyledBox = styled.div`
  border-right: ${({ isActive }) =>
    isActive ? "1px solid white" : "1px solid black"};
  width: ${({ filter }) =>
    filter === 2 ? "50%" : filter === 3 ? "33.3%" : "25%"};
  height: 4.6vh;
`;

export default function PalettesFilter({
  paletteListType,
  onShowPalettesWith2Colors,
  onShowPalettesWith3Colors,
  onShowPalettesWith4Colors,
}) {
  return (
    <FilterContainer>
      <StyledButton
        onClick={() => onShowPalettesWith2Colors()}
        isActive={paletteListType === 2}
      >
        <StyledBox filter={2} isActive={paletteListType === 2} />
      </StyledButton>
      <StyledButton
        onClick={() => onShowPalettesWith3Colors()}
        isActive={paletteListType === 3}
      >
        <StyledBox filter={3} isActive={paletteListType === 3} />
        <StyledBox filter={3} isActive={paletteListType === 3} />
      </StyledButton>
      <StyledButton
        onClick={() => onShowPalettesWith4Colors()}
        isActive={paletteListType === 4}
      >
        <StyledBox filter={4} isActive={paletteListType === 4} />
        <StyledBox filter={4} isActive={paletteListType === 4} />
        <StyledBox filter={4} isActive={paletteListType === 4} />
      </StyledButton>
    </FilterContainer>
  );
}
