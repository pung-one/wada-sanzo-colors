import styled from "styled-components";

const Message = styled.aside`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 45vh;
  left: 25vw;
  width: 50vw;
  height: 8vh;
  font-size: 3vh;
  z-index: 11;
  background-color: white;
  border: 1px solid black;
  overflow: hidden;
  transform: ${({ showSignOutMessage }) =>
    showSignOutMessage ? "scale(1)" : "scale(0)"};
  transition: all 0.2s;
`;

export default function SignOutMessage({ showSignOutMessage }) {
  return (
    <Message showSignOutMessage={showSignOutMessage}>Signing out...</Message>
  );
}
