import styled from "styled-components";

type Props = {
  showMessage: boolean;
  isLarge: boolean;
  label: string;
};

export default function CopyColorCodeMessage({
  showMessage,
  label,
  isLarge,
}: Props) {
  return (
    <FavMessage $showMessage={showMessage} $isLarge={isLarge}>
      {label}-code saved to clipboard.
    </FavMessage>
  );
}

const FavMessage = styled.span<{
  $showMessage: boolean;
  $isLarge: boolean;
}>`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 50%;
  padding: 20px;
  z-index: 5;
  font-size: 0.7rem;
  background-color: white;
  border: 1px solid black;
  overflow-x: hidden;
  transform: ${({ $showMessage }) =>
    $showMessage ? "scale(1) translateX(-50%)" : "scale(0) translateX(-50%)"};
  transition: all 0.2s;
`;
