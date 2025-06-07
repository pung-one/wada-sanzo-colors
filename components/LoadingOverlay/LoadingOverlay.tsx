import styled from "styled-components";

export function LoadingOverlay({ visible }: { visible: boolean }) {
  return (
    <Overlay $visible={visible}>
      <Spinner />
    </Overlay>
  );
}

const Overlay = styled.div<{ $visible: boolean }>`
  z-index: 5;
  backdrop-filter: blur(5px);
  position: absolute;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  width: 100%;
  height: 100%;
  transform: ${({ $visible }) => ($visible ? "scale(1)" : "scale(0)")};
`;

const Spinner = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid black;
  border-bottom: 1px solid transparent;
  @keyframes spin {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  animation: spin 1.5s linear infinite;
`;
