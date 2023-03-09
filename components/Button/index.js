import styled from "styled-components";

const StyledButton = styled.button`
  background-color: white;
  border: 1px solid black;
  padding: 5vh;
  width: 60vw;
  box-shadow: 3px 3px grey;
  &:hover {
    cursor: pointer;
  }
`;

export default function Button({ value, setFilter }) {
  function handleClick(value) {
    setFilter(value);
  }

  return (
    <>
      <StyledButton
        type="button"
        onClick={() => {
          handleClick(value);
        }}
      >
        {value}
      </StyledButton>
    </>
  );
}
