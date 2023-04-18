import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
@font-face {
  font-family: "AvenirLT Light";
  src: local("AvenirLT-Light"),
    url("./fonts/fonts/AvenirLT-Light.ttf") format("truetype");
}
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    text-decoration: none;
    margin: 0;
    font-family: "AvenirLT Light", system-ui, sans-serif;
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
