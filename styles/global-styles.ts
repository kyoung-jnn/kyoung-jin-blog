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
    color: var(--text);
    background-color: var(--bg);
    -webkit-font-smoothing: antialiased;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: var(--text);
    transition: color 0.5s;
    &:hover {
      color: var(--focus-text);
    }
  }

  ul, li {
    list-style: none;
    padding: 0px;
  }
  
  button {
    all: unset;
  }
`;

export default GlobalStyle;
