import styled from "styled-components";

export default function CopyField({ value, label, isLarge, onShowMessage }) {
  function handleCopy() {
    navigator.clipboard.writeText(value);
  }

  return (
    <StyledButton
      isLarge={isLarge}
      onClick={() => {
        handleCopy();
        onShowMessage(value, label);
      }}
    >
      {label}
    </StyledButton>
  );
}

const StyledButton = styled.span`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 1px solid black;
  width: ${({ isLarge }) => (isLarge ? "25vw" : "20vw")};
  height: ${({ isLarge }) => (isLarge ? "100%" : "70%")};
  box-shadow: 0 0 3px black;
  &:hover {
    cursor: pointer;
  }
  &:active {
    box-shadow: none;
  }
  transition: box-shadow 0.2s;
`;
