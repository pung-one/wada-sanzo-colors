import styled from "styled-components";
import { AppStoreLink } from "../AppStoreLink/AppStoreLink";

export function AnnouncementModal({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) {
  return (
    <Container $show={show}>
      <CloseButton onClick={onClose} />

      <h2>NEW iOS APP</h2>
      <p>
        I published the new iOS app <b>W.S. Colors</b>:
      </p>
      <ul>
        <li>
          Use the built-in <b>color scanner</b> to match real-world colors with
          those from the collection and find harmonious combinations for your
          project.
        </li>

        <li>
          Browse 348 harmonious color palettes from the original collection.
        </li>

        <li>
          Instantly copy CMYK, RGB, HEX, and LAB values for any color or
          palette.
        </li>

        <li>
          Save favorite palettes and access them on any other device via the
          website.
        </li>
      </ul>
      <AppStoreLink />

      <p>
        The app is for free. If you like it I appreciate a{" "}
        <a
          href="https://www.paypal.com/donate/?hosted_button_id=PAFRAKM2HQWVY"
          target="_blank"
        >
          paypal donation
        </a>
        .
      </p>
    </Container>
  );
}

const Container = styled.div<{ $show: boolean }>`
  display: ${({ $show }) => ($show ? "flex" : "none")};
  align-items: center;
  position: fixed;
  flex-direction: column;
  gap: 20px;
  top: 50%;
  left: calc(50% - 10px);
  transform: translate(-50%, -50%);
  z-index: 9999;
  width: calc(100% - 20px);
  max-width: 600px;
  margin: 10px;
  padding: 20px;
  background-color: white;
  border: 1px solid black;
  box-shadow: 0 0 60px grey;
  h2 {
    text-align: center;
  }
  p {
    max-width: 600px;
    a {
      text-decoration: underline;
    }
  }
  ul {
    list-style-position: inside;
  }
  li {
    font-size: 0.9rem;
    margin-bottom: 5px;
  }
  span {
    font-size: 14px;
  }
  @media screen and (max-width: 380px) {
    gap: 10px;
    p,
    li,
    b,
    * {
      font-size: 0.8rem;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  background: none;
  width: 50px;
  height: 50px;
  cursor: pointer;
  &:after,
  &:before {
    content: "";
    position: absolute;
    left: 20%;
    height: 1px;
    width: 60%;
    background: black;
    transition: transform 0.3s ease;
  }
  &:before {
    transform: rotate(-45deg) translateY(0px);
  }
  &:after {
    transform: rotate(45deg) translateY(0px);
  }
`;
