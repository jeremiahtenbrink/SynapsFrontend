import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

const GlobalStyle = createGlobalStyle`
${ normalize }
  body {
        font-family: "Source Sans Pro";
  }  
`;

export const getGlobalStyles = () => GlobalStyle;
