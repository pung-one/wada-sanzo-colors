import Countdown from "react-countdown";
import styled from "styled-components";
import { useEffect, useRef } from "react";

export default function CountdownPage() {
  const videoRef = useRef(null);

  async function startCamera() {
    try {
      const stream = await navigator?.mediaDevices?.getUserMedia({
        video: true,
        audio: false,
      });

      if (videoRef?.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  }

  return (
    <PageContainer>
      <Headline>
        Wann gehen Olli, Jonas und Paul endlich zum Edwin Rosen Konzert?
      </Headline>

      <button onClick={startCamera}>start</button>
      <video ref={videoRef} autoPlay muted playsInline />

      <Countdown date={"2025-11-08T12:20:00.00"} />
    </PageContainer>
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
