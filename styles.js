import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    text-decoration: none;
    margin: 0;
    font-family: system-ui;
    font-size: 2vh;
    text-align: center;
    color: black;
  }
`;
