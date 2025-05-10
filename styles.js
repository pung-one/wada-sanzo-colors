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
    font-size: 18px;
    padding: 0;
    color: black;
  } 
`;
