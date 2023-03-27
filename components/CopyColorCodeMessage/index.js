import styled from "styled-components";

const FavMessage = styled.span`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 40%;
  width: 50vw;
  height: 6vh;
  z-index: 5;
  background-color: white;
  border: 1px solid black;
  overflow: hidden;
  transform: ${({ showMessage, isTriggered }) =>
    showMessage && isTriggered ? "scale(1)" : "scale(0)"};
  transition: all 0.2s;
`;

export default function CopyColorCodeMessage({
  handleShowMessage,
  showMessage,
  value,
}) {
  return (
    <FavMessage showMessage={showMessage} isTriggered={isTriggered}>
      <p>{value} saved to clipboard</p>
    </FavMessage>
  );
}
