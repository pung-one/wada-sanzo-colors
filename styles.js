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
  h1 {
    font-size: 4vh;
  }
  h2 {
    text-decoration: underline;
    font-size: 2.5vh;
  }
`;
