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

const StyledButton = styled.button`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 1px solid black;
  width: 100%;
  height: ${({ isLarge }) => (isLarge ? "100%" : "75%")};
  box-shadow: 0 0 3px black;
  &:hover {
    cursor: pointer;
  }
  &:active {
    box-shadow: none;
  }
  transition: box-shadow 0.2s;
`;
