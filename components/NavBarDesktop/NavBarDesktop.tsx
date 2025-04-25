"use client";

import styled from "styled-components";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { SlArrowRight } from "react-icons/sl";
import CombinationsFilter from "../CombinationsFilter/CombinationsFilter";
import ColorFilter from "../ColorFilter/ColorFilter";
import { ActionContext } from "../Layout/Layout";
import { TabBar } from "../TabBar/TabBar";
import { usePathname } from "next/navigation";
import { set } from "mongoose";

type Props = {
  setListType: (type: "colors" | "combinations") => void;
  setCombinationListType: (type: number) => void;
  setColorListType: (type: number) => void;
};

export default function NavBarDesktop({
  setListType,
  setCombinationListType,
  setColorListType,
}: Props) {
  const [showTabBar, setShowTabBar] = useState(false);
  const route = usePathname();

  const actionContext = useContext(ActionContext);

  if (!actionContext) return <h1>Loading...</h1>;

  const { listType, inspirationPageFilter, setInspirationPageFilter } =
    actionContext;

  useEffect(() => {
    setShowTabBar(true);
  }, [route]);

  return (
    <NavContainer>
      <NavPages>
        <NavButton
          href={"/inspiration"}
          $isActive={
            route === "/inspiration" && inspirationPageFilter === "initialPage"
          }
          onClick={() => setInspirationPageFilter("initialPage")}
        >
          Inspiration
        </NavButton>

        <NavButton
          href={"/"}
          $isActive={route === "/"}
          onClick={() => {
            setShowTabBar(!showTabBar);
          }}
        >
          <Arrow $isOpen={showTabBar} $isActive={route === "/"} />
          Collection
        </NavButton>

        {route === "/" && showTabBar ? (
          <TabBar setListType={setListType} listType={listType} />
        ) : null}

        <NavButton
          href={"/favorites"}
          $isActive={route === "/favorites"}
          onClick={() => {
            setShowTabBar(!showTabBar);
          }}
        >
          <Arrow $isOpen={showTabBar} $isActive={route === "/favorites"} />
          Favorites
        </NavButton>

        {route === "/favorites" && showTabBar ? (
          <TabBar setListType={setListType} listType={listType} />
        ) : null}

        <NavButton href={"/about"} $isActive={route === "/about"}>
          About
        </NavButton>
      </NavPages>
      {(listType === "colors" && route === "/") ||
      (listType === "colors" && route === "/favorites") ? (
        <ColorFilter
          setColorListType={setColorListType}
          isAtFavorites={route === "/favorites"}
        />
      ) : null}
      {(listType === "combinations" && route === "/") ||
      (listType === "combinations" && route === "/favorites") ? (
        <CombinationsFilter
          setCombinationListType={setCombinationListType}
          isAtFavorites={route === "/favorites"}
        />
      ) : null}
    </NavContainer>
  );
}

const NavContainer = styled.div`
  position: fixed;
  top: 6.5vh;
  z-index: 5;
  left: 0;
  width: 30%;
  height: 100%;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  @media screen and (max-width: 1024px), screen and (orientation: portrait) {
    display: none;
  }
`;

const NavPages = styled.nav`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const NavButton = styled(Link)<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2vh;
  height: 6vh;
  width: 100%;
  border-bottom: 1px solid black;
  background-color: ${({ $isActive }) => ($isActive ? "black" : "white")};
  color: ${({ $isActive }) => ($isActive ? "white" : "black")};
  transition: all 0.1s;
  &:hover {
    cursor: pointer;
    box-shadow: inset 0 0 2px black;
  }
  &:active {
    box-shadow: inset 0 0 3px black;
  }
`;

const Arrow = styled(SlArrowRight)<{ $isOpen: boolean; $isActive: boolean }>`
  position: absolute;
  left: 0;
  width: 10%;
  fill: ${(props) => (props.$isActive ? "white" : "black")};
  transform: ${(props) =>
    props.$isOpen && props.$isActive ? "rotate(90deg)" : ""};
  transition: transform 0.3s;
`;
