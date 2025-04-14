"use client";

import Countdown from "react-countdown";
import styled from "styled-components";

export default function CountdownPage() {
  return (
    <>
      <h1>hhi</h1>
      {/* <PageContainer>
        <Headline>
          Wann gehen Olli, Jonas und Paul endlich zum Edwin Rosen Konzert?
        </Headline>

        <Countdown date={"2025-11-08T12:20:00.00"} />
      </PageContainer> */}
    </>
  );
}

const PageContainer = styled.main`
  margin: 0 0 2vh;
  display: flex;
  flex-direction: column;
  gap: 50px;
  span {
    text-align: center;
  }
  @media screen and (min-width: 1024px), screen and (orientation: landscape) {
    width: 70%;
    margin-left: 30%;
  }
`;

const Headline = styled.h1`
  margin-top: 150px;
  padding: 20px;
  text-align: center;
`;
