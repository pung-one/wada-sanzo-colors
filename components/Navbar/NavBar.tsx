"use client";

import styled from "styled-components";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import CombinationsFilter from "../CombinationsFilter/CombinationsFilter";
import ColorFilter from "../ColorFilter/ColorFilter";
import { ActionContext } from "../Layout/Layout";
import { TabBar } from "../TabBar/TabBar";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const route = usePathname();
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  function handleScroll() {
    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        if (show) setShow(false);
      } else {
        if (!show) setShow(true);
      }

      setLastScrollY(currentScrollY);
    }
  }

  const actionContext = useContext(ActionContext);

  if (!actionContext) return <h1>Loading...</h1>;

  const { listType } = actionContext;

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [lastScrollY]);

  return (
    <NavContainer $show={show}>
      <NavPages>
        <NavButton
          href={"/inspiration"}
          $isActive={route.includes("inspiration")}
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
      {route === "/" || route === "/favorites" ? <TabBar /> : null}
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

const NavContainer = styled.div<{ $show: boolean }>`
  position: fixed;
  z-index: 5;
  top: ${({ $show }) => (!$show ? "-182px" : "60px")};
  width: 100%;
  transition: top 0.5s;
  @media screen and (min-width: 1024px), screen and (orientation: landscape) {
    display: none;
  }
`;

const NavPages = styled.nav`
  position: relative;
  display: flex;
  padding: 10px;
  gap: 10px;
  align-items: center;
  width: 100%;
  background-color: white;
  border-bottom: 1px solid black;
`;

const NavButton = styled(Link)<{ $isActive: boolean }>`
  flex: 1;
  border: 1px solid black;
  font-size: 0.8rem;
  padding: 10px;
  text-align: center;
  box-shadow: ${({ $isActive }) => ($isActive ? "" : "0 0 2px black")};
  background-color: ${({ $isActive }) => ($isActive ? "black" : "white")};
  color: ${({ $isActive }) => ($isActive ? "white" : "black")};
  &:hover {
    cursor: pointer;
    box-shadow: none;
  }
  @media screen and (min-width: 1024px), screen and (orientation: landscape) {
    font-size: 1rem;
  }
`;
