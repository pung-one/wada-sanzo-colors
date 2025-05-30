import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

export function AnnouncementModal({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) {
  return (
    <Container $show={show} onClick={onClose}>
      <p>
        Due to recent changes to the login system, please{" "}
        <Link href={"/signin"}>log out and log in again</Link> to ensure your
        favorites are saved correctly.
        <br />
        <br />
        <span>
          If you experience any issues, clearing your browsers cache and logging
          in again may help.
        </span>
      </p>

      <CloseButton />
    </Container>
  );
}

const Container = styled.div<{ $show: boolean }>`
  display: ${({ $show }) => ($show ? "flex" : "none")};
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 9999;
  width: calc(100% - 20px);
  margin: 10px;
  background-color: white;
  border: 1px solid black;
  p {
    padding: 20px 10px;
    text-align: center;
    flex: 1;
  }
  span {
    font-size: 14px;
  }
  a {
    text-decoration: underline;
  }
`;

const CloseButton = styled.button`
  position: relative;
  border: none;
  background: none;
  width: 50px;
  height: 50px;
  margin-right: 10px;
  cursor: pointer;
  &:after,
  &:before {
    content: "";
    position: absolute;
    left: 5%;
    height: 1px;
    width: 90%;
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
