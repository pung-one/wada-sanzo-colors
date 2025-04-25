"use client";

import styled from "styled-components";
import { TfiArrowRight } from "react-icons/tfi";
import { useContext } from "react";
import { ActionContext } from "../Layout/Layout";

export function TabBar() {
  const actionContext = useContext(ActionContext);

  if (!actionContext) return <h1>Loading...</h1>;

  const { listType, setListType } = actionContext;

  return (
    <TabContainer>
      <MobileButtonContainer>
        <StyledButton
          type="button"
          $isActive={listType === "colors"}
          onClick={() => setListType("colors")}
        >
          Colors
        </StyledButton>
      </MobileButtonContainer>

      <Tab>
        <IsActiveArrow $isActive={listType === "colors"} />
        <StyledButton
          type="button"
          $isActive={listType === "colors"}
          onClick={() => setListType("colors")}
        >
          Colors
        </StyledButton>
      </Tab>

      <MobileButtonContainer>
        <StyledButton
          type="button"
          $isActive={listType === "combinations"}
          onClick={() => setListType("combinations")}
        >
          Combinations
        </StyledButton>
      </MobileButtonContainer>

      <Tab>
        <IsActiveArrow $isActive={listType === "combinations"} />
        <StyledButton
          type="button"
          $isActive={listType === "combinations"}
          onClick={() => setListType("combinations")}
        >
          Combinations
        </StyledButton>
      </Tab>
    </TabContainer>
  );
}

const TabContainer = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 9vh;
  padding: 1vh 0 1vh;
  background-color: white;
  border-bottom: 1px solid black;
  @media screen and (min-width: 1024px), screen and (orientation: landscape) {
    height: 100%;
    flex-direction: column;
    padding: 0;
  }
`;

const MobileButtonContainer = styled.section`
  display: initial;
  @media screen and (min-width: 1024px), screen and (orientation: landscape) {
    display: none;
  }
`;

const Tab = styled.section`
  display: none;
  width: 100%;
  @media screen and (min-width: 1024px), screen and (orientation: landscape) {
    display: flex;
  }
`;

const IsActiveArrow = styled(TfiArrowRight)<{ $isActive: boolean }>`
  position: relative;
  width: 10%;
  font-size: 2vh;
  margin: auto;
  left: ${(props) => (props.$isActive ? "0" : "-10%")};
  transition: left 0.3s;
`;

const StyledButton = styled.button<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid black;
  height: 6vh;
  width: 45%;
  box-shadow: ${({ $isActive }) => ($isActive ? null : "0 0 2px black")};
  background-color: ${({ $isActive }) => ($isActive ? "black" : "white")};
  color: ${({ $isActive }) => ($isActive ? "white" : "black")};
  &:hover {
    cursor: pointer;
    box-shadow: none;
  }
  @media screen and (min-width: 1024px), screen and (orientation: landscape) {
    width: 90%;
    height: 6vh;
    border: none;
    box-shadow: none;
    border-top: ${({ $isActive }) =>
      $isActive ? "1px solid white" : "1px solid black"};
    border-left: 1px solid black;
    &:hover {
      cursor: pointer;
      box-shadow: inset 0 0 1px black;
    }
    &:active {
      box-shadow: inset 0 0 3px black;
    }
  }
`;
