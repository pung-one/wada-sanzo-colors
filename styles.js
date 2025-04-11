import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: "AvenirLTStd-Book";
  src: local("AvenirLTStd-Book"),
    url("./fonts/AvenirLTStd-Book.otf") format("truetype");
}
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    text-decoration: none;
    margin: 0;
    font-family: "AvenirLTStd-Book", system-ui, sans-serif;
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
