"use client";

import styled from "styled-components";
import NavBar from "../Navbar/NavBar";
import NavBarDesktop from "../NavBarDesktop/NavBarDesktop";
import Link from "next/link";
import { createContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnnouncementModal } from "../AnnouncementModal/AnnouncementModal";

export type ContextProps = {
  listType: "colors" | "combinations";
  setListType: (type: "colors" | "combinations") => void;
  combinationListType: number;
  setCombinationListType: (type: number) => void;
  colorListType: number;
  setColorListType: (type: number) => void;
};

export const ActionContext = createContext<ContextProps | null>(null);

export function Layout({ children }: { children: React.ReactNode }) {
  const route = usePathname();

  const [listType, setListType] = useState<"colors" | "combinations">(
    "combinations"
  );

  const [combinationListType, setCombinationListType] = useState(0);

  const [colorListType, setColorListType] = useState(0);

  /* const [showModal, setShowModal] = useState(true); */

  useEffect(() => {
    setColorListType(0);
    setCombinationListType(0);
  }, [route]);

  return (
    <>
      <Header>
        A Dictionary of Color Combinations
        <SignInOutButton $isActive={route === "/signin"} href={"/signin"}>
          Sign In/Out
        </SignInOutButton>
      </Header>

      <ActionContext.Provider
        value={{
          listType: listType,
          setListType: setListType,
          combinationListType: combinationListType,
          setCombinationListType: setCombinationListType,
          colorListType: colorListType,
          setColorListType: setColorListType,
        }}
      >
        <NavBar />

        <NavBarDesktop />

        {children}
      </ActionContext.Provider>

      <DonationButton
        href="https://www.paypal.com/donate/?hosted_button_id=PAFRAKM2HQWVY"
        target="_blank"
      >
        Donate
      </DonationButton>

      {/* <AnnouncementModal show={showModal} onClose={() => setShowModal(false)} /> */}
    </>
  );
}

const Header = styled.header`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 6;
  width: 100%;
  height: 60px;
  top: 0;
  font-weight: lighter;
  background-color: white;
  border-bottom: 1px solid black;
  padding: 10px 20px;
`;

const SignInOutButton = styled(Link)<{ $isActive: boolean }>`
  padding: 10px;
  border: 1px solid black;
  font-size: 0.8rem;
  white-space: nowrap;
  background-color: ${({ $isActive }) => ($isActive ? "black" : "white")};
  color: ${({ $isActive }) => ($isActive ? "white" : "black")};
  box-shadow: ${({ $isActive }) => ($isActive ? "" : "0 0 2px black")};
  transition: all 0.2s;
  &:hover {
    cursor: pointer;
    box-shadow: none;
  }
  @media screen and (min-width: 1024px), screen and (orientation: landscape) {
    font-size: 1rem;
  }
`;

const DonationButton = styled.a`
  z-index: 999;
  position: fixed;
  bottom: 10px;
  left: 10px;
  font-weight: normal;
  padding: 10px;
  background-color: white;
  color: black;
  border: 1px solid black;
  box-shadow: 0 0 2px black;
  transition: all 0.2s;
  &:hover {
    cursor: pointer;
    box-shadow: none;
  }
`;
