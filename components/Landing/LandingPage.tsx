"use client";

import styled from "styled-components";
import ColorsList from "@/components/ColorsList/ColorsList";
import CombinationsList from "@/components/CombinationsList/CombinationsList";
import { useContext } from "react";
import { ActionContext } from "../Layout/Layout";
import { ColorObject, CombinationObject } from "@/lib/types";

type Props = {
  colors: ColorObject[];
  combinations: CombinationObject[];
};

export default function LandingPage({ colors, combinations }: Props) {
  const actionContext = useContext(ActionContext);

  return (
    <PageContainer>
      {actionContext?.listType === "colors" ? (
        <ColorsList colors={colors} />
      ) : (
        <CombinationsList combinations={combinations} />
      )}
    </PageContainer>
  );
}

const PageContainer = styled.main`
  position: relative;
  margin: 0 0 2vh;
  @media screen and (min-width: 1024px), screen and (orientation: landscape) {
    width: 70%;
    margin-left: 30%;
  }
`;
