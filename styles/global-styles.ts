import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import { darkTheme, lightTheme } from './theme';

const GlobalStyle = createGlobalStyle`
  ${normalize}

  // Using next-themes
  :root {
    ${lightTheme}
  }

  [data-theme="dark"] {
   ${darkTheme}
  }
  
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
`;

export default GlobalStyle;
