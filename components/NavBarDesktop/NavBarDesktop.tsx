"use client";

import styled from "styled-components";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { SlArrowRight } from "react-icons/sl";
import CombinationsFilter from "../CombinationsFilter/CombinationsFilter";
import ColorFilter from "../ColorFilter/ColorFilter";
import { ActionContext } from "../Layout/Layout";
import { usePathname } from "next/navigation";
import { TfiArrowRight } from "react-icons/tfi";

export default function NavBarDesktop() {
  const [showTabBar, setShowTabBar] = useState(false);
  const route = usePathname();

  const actionContext = useContext(ActionContext);

  if (!actionContext) return <h1>Loading...</h1>;

  const { listType } = actionContext;

  useEffect(() => {
    setShowTabBar(true);
  }, [route]);

  return (
    <NavContainer>
      <NavPages>
        <NavButton
          href={"/inspiration"}
          $isActive={route.includes("inspiration")}
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
          <SlArrowRight />
          Collection
        </NavButton>

        <SecondaryContainer $open={route === "/"}>
          <SecondaryNavButton
            onClick={() => actionContext.setListType("colors")}
            $isActive={listType === "colors"}
          >
            <TfiArrowRight />
            Colors
          </SecondaryNavButton>

          <SecondaryNavButton
            onClick={() => actionContext.setListType("combinations")}
            $isActive={listType === "combinations"}
          >
            <TfiArrowRight />
            Combinations
          </SecondaryNavButton>
        </SecondaryContainer>

        <NavButton
          href={"/favorites"}
          $isActive={route === "/favorites"}
          onClick={() => {
            setShowTabBar(!showTabBar);
          }}
        >
          <SlArrowRight />
          Favorites
        </NavButton>

        <SecondaryContainer $open={route === "/favorites"}>
          <SecondaryNavButton
            onClick={() => actionContext.setListType("colors")}
            $isActive={listType === "colors"}
          >
            <TfiArrowRight />
            Colors
          </SecondaryNavButton>

          <SecondaryNavButton
            onClick={() => actionContext.setListType("combinations")}
            $isActive={listType === "combinations"}
          >
            <TfiArrowRight />
            Combinations
          </SecondaryNavButton>
        </SecondaryContainer>

        <NavButton href={"/about"} $isActive={route === "/about"}>
          About
        </NavButton>
      </NavPages>

      {(listType === "colors" && route === "/") ||
      (listType === "colors" && route === "/favorites") ? (
        <ColorFilter isAtFavorites={route === "/favorites"} />
      ) : null}

      {(listType === "combinations" && route === "/") ||
      (listType === "combinations" && route === "/favorites") ? (
        <CombinationsFilter isAtFavorites={route === "/favorites"} />
      ) : null}
    </NavContainer>
  );
}

const NavContainer = styled.div`
  position: fixed;
  top: 60px;
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
  width: 100%;
`;

const NavButton = styled(Link)<{ $isActive?: boolean }>`
  text-align: center;
  width: 100%;
  padding: 20px;
  border-bottom: 1px solid black;
  background-color: ${({ $isActive }) => ($isActive ? "black" : "white")};
  color: ${({ $isActive }) => ($isActive ? "white" : "black")};
  pointer-events: ${({ $isActive }) => ($isActive ? "none" : "initial")};
  transition: all 0.1s;
  &:hover {
    cursor: pointer;
    box-shadow: inset 0 0 2px black;
  }
  &:active {
    box-shadow: inset 0 0 3px black;
  }
  svg {
    position: absolute;
    left: 0;
    width: 10%;
    transition: transform 0.3s;
    fill: ${(props) => (props.$isActive ? "white" : "black")};
    transform: ${(props) => (props.$isActive ? "rotate(90deg)" : "")};
  }
`;

const SecondaryContainer = styled.div<{ $open: boolean }>`
  transition: height 0.2s ease;
  height: ${({ $open }) => ($open ? "120px" : "0")};
  border-bottom: ${({ $open }) => ($open ? "1px solid black" : "none")};

  overflow: hidden;
`;

const SecondaryNavButton = styled.button<{
  $isActive?: boolean;
}>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 90%;
  margin-left: 10%;
  height: 60px;
  border: none;
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  background-color: ${({ $isActive }) => ($isActive ? "black" : "white")};
  color: ${({ $isActive }) => ($isActive ? "white" : "black")};
  pointer-events: ${({ $isActive }) => ($isActive ? "none" : "initial")};
  transition: all 0.1s;
  &:hover {
    cursor: pointer;
    box-shadow: inset 0 0 2px black;
  }
  &:active {
    box-shadow: inset 0 0 3px black;
  }
  svg {
    position: absolute;
    left: ${(props) => (props.$isActive ? "-10%" : "-30%")};
    fill: black;
    transition: left 0.3s;
  }
`;
