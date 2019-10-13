import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    background-color: #151516;
  }
  body {
    font-family: "Avenir Next", "Avenir", sans-serif;
  }
`;

export default GlobalStyle;
