"use client";

import styled from "styled-components";
import { useContext } from "react";
import { ActionContext } from "../Layout/Layout";

export function TabBar() {
  const actionContext = useContext(ActionContext);

  if (!actionContext) return <h1>Loading...</h1>;

  const { listType, setListType } = actionContext;

  return (
    <TabContainer>
      <StyledButton
        type="button"
        $isActive={listType === "colors"}
        onClick={() => setListType("colors")}
      >
        Colors
      </StyledButton>

      <StyledButton
        type="button"
        $isActive={listType === "combinations"}
        onClick={() => setListType("combinations")}
      >
        Combinations
      </StyledButton>
    </TabContainer>
  );
}

const TabContainer = styled.nav`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;
  padding: 10px;
  background-color: white;
  border-bottom: 1px solid black;
  @media screen and (min-width: 1024px), screen and (orientation: landscape) {
    height: 100%;
    flex-direction: column;
    padding: 0;
    gap: initial;
  }
`;

const StyledButton = styled.button<{ $isActive?: boolean }>`
  border: 1px solid black;
  font-size: 0.8rem;
  padding: 10px;
  flex: 1;
  box-shadow: ${({ $isActive }) => ($isActive ? null : "0 0 2px black")};
  background-color: ${({ $isActive }) => ($isActive ? "black" : "white")};
  color: ${({ $isActive }) => ($isActive ? "white" : "black")};
  &:hover {
    cursor: pointer;
    box-shadow: none;
  }
`;
