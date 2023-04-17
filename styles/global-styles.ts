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
  
  // Default Styling
  body {
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    color: var(--text);
    background-color: var(--bg);
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

  img {
    -webkit-user-drag: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0 0 5px 0;
  }
`;

export default GlobalStyle;
