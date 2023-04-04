import styled from "styled-components";

export default function CopyColorCodeMessage({ showMessage, label, isLarge }) {
  return (
    <FavMessage showMessage={showMessage} isLarge={isLarge}>
      {label}-code saved to clipboard.
    </FavMessage>
  );
}

const FavMessage = styled.span`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: ${({ isLarge }) => (isLarge ? "14%" : "")};
  width: ${({ isLarge }) => (isLarge ? "60%" : "40%")};
  padding: 2vh;
  z-index: 5;
  background-color: white;
  border: 1px solid black;
  overflow-x: hidden;
  transform: ${({ showMessage }) => (showMessage ? "scale(1)" : "scale(0)")};
  transition: all 0.2s;
`;
