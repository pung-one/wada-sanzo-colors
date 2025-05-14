import styled from "styled-components";

type Props = {
  value: string | number[];
  label: string;
  isLarge: boolean;
  onShowMessage: () => void;
};

export default function CopyField({
  value,
  label,
  isLarge,
  onShowMessage,
}: Props) {
  function handleCopy() {
    navigator.clipboard.writeText(value.toString());
  }

  return (
    <StyledButton
      $isLarge={isLarge}
      onClick={() => {
        handleCopy();
        onShowMessage();
      }}
    >
      copy {label}
    </StyledButton>
  );
}

const StyledButton = styled.button<{ $isLarge: boolean }>`
  flex-basis: 40%;
  background-color: white;
  border: 1px solid black;
  font-size: 0.8rem;
  padding: 10px;
  box-shadow: 0 0 3px black;
  &:hover {
    cursor: pointer;
  }
  &:active {
    box-shadow: none;
  }
  transition: box-shadow 0.2s;
`;
