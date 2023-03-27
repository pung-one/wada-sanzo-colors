import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: ${({ isLarge }) => (!isLarge ? "column" : null)};
  margin: 1px;
`;

const StyledInput = styled.input`
  max-width: 26vw;
`;

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

export default function CopyField({ name, value, label, isLarge }) {
  function handleCopy(event) {
    navigator.clipboard.writeText(value);
  }

  return (
    <StyledButton isLarge={isLarge} onClick={() => handleCopy()}>
      {label}
    </StyledButton>
    /* <StyledForm isLarge={isLarge} onSubmit={(event) => handleCopy(event)}>
      <StyledInput
        aria-label={`${label}-code of color: ${name}`}
        name="copyfield"
        readOnly={true}
        value={value}
      />
      <StyledButton
        aria-label={`copy ${label}-code of color: ${name}`}
        type="submit"
      >
        copy {label}
      </StyledButton>
    </StyledForm> */
  );
}
