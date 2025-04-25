"use client";

import styled from "styled-components";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import CombinationsFilter from "../CombinationsFilter/CombinationsFilter";
import ColorFilter from "../ColorFilter/ColorFilter";
import { ActionContext } from "../Layout/Layout";
import { TabBar } from "../TabBar/TabBar";
import { usePathname } from "next/navigation";

type Props = {
  setListType: (type: "colors" | "combinations") => void;
  setColorListType: (type: number) => void;
  setCombinationListType: (type: number) => void;
};

export default function NavBar({
  setListType,
  setCombinationListType,
  setColorListType,
}: Props) {
  const route = usePathname();
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  function handleScroll() {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    }
  }

  const actionContext = useContext(ActionContext);

  if (!actionContext) return <h1>Loading...</h1>;

  const { listType, inspirationPageFilter, setInspirationPageFilter } =
    actionContext;

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [lastScrollY]);

  return (
    <NavContainer $show={show}>
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

        <NavButton href={"/"} $isActive={route === "/"}>
          Collection
        </NavButton>

        <NavButton href={"/favorites"} $isActive={route === "/favorites"}>
          Favorites
        </NavButton>
        <NavButton href={"/about"} $isActive={route === "/about"}>
          About
        </NavButton>
      </NavPages>
      {route === "/" || route === "/favorites" ? (
        <TabBar setListType={setListType} listType={listType} />
      ) : null}
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

const NavContainer = styled.div<{ $show: boolean }>`
  position: fixed;
  z-index: 5;
  top: ${({ $show }) => (!$show ? "-30vh" : "6.5vh")};
  width: 100%;
  transition: top 0.5s;
  @media screen and (min-width: 1024px), screen and (orientation: landscape) {
    display: none;
  }
`;

const NavPages = styled.nav`
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 9vh;
  background-color: white;
  border-bottom: 1px solid black;
`;

const NavButton = styled(Link)<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  box-shadow: ${({ $isActive }) => ($isActive ? "" : "0 0 2px black")};
  background-color: ${({ $isActive }) => ($isActive ? "black" : "white")};
  color: ${({ $isActive }) => ($isActive ? "white" : "black")};
  padding: 1vh 2vw 1vh;
  font-size: 2vh;
  height: 6vh;
  width: 22.5%;
  text-align: center;
  &:hover {
    cursor: pointer;
    box-shadow: none;
  }
`;
