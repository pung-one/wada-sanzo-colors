"use client";

import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    text-decoration: none;
    margin: 0;
    font-family: --var(--AvenirLTStdBook), system-ui, sans-serif;
    font-size: 2vh;
    padding: 0;
    color: black;
  }
  h1 {
    font-size: 4vh;
  }
  h2 {
    font-size: 2.5vh;
  }
`;
