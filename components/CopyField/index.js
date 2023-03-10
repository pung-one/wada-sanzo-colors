import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: ${({ isLarge }) => (!isLarge ? "column" : null)};
  margin: 1px;
`;

const StyledInput = styled.input`
  max-width: 23vw;
`;

const StyledButton = styled.button`
  background-color: white;
  border: 1px solid black;
  width: 23vw;
  box-shadow: 1px 1px 2px grey;
  &:active {
    box-shadow: none;
  }
`;

export default function CopyField({ value, label, isLarge }) {
  function handleCopy(event) {
    event.preventDefault();
    navigator.clipboard.writeText(value);
  }

  return (
    <StyledForm isLarge={isLarge} onSubmit={(event) => handleCopy(event)}>
      <StyledInput name="copyfield" readOnly={true} value={value} />
      <StyledButton type="submit">copy {label}</StyledButton>
    </StyledForm>
  );
}
