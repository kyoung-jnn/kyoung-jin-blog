import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import { darkTheme, lightTheme } from './theme';

const GlobalStyle = createGlobalStyle`
  // CSS Reset
  ${normalize}

  // Using next-themes
  :root {
    ${lightTheme}
  }

  [data-theme="dark"] {
   ${darkTheme}
  }
  
  // Font
  html  { font-family: 'Inter', sans-serif; }
  @supports (font-variation-settings: normal) {
    html { font-family: 'Inter var', sans-serif; }
  }

  // Default Styling
  body {
    letter-spacing: -0.5px;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: black;
  }

  ul, li {
    list-style: none;
    padding: 0px;
  }
`;

export default GlobalStyle;
