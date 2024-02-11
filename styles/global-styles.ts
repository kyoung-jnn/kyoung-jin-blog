import { css } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';
import { darkTheme, lightTheme } from './theme';

const GlobalStyles = css`
  // CSS Reset
  ${emotionNormalize}

  // Using next-themes
  :root {
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: var(--scrollbar-color) transparent;
  }

  [data-theme='light'] {
    ${lightTheme}
  }

  [data-theme='dark'] {
    ${darkTheme}
  }

  // Default Styling
  body {
    font-family:
      GowunBatang,
      'Pretendard Variable',
      Pretendard,
      -apple-system,
      BlinkMacSystemFont,
      system-ui,
      Roboto,
      'Helvetica Neue',
      'Segoe UI',
      'Apple SD Gothic Neo',
      'Noto Sans KR',
      'Malgun Gothic',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
      sans-serif;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: var(--text);
    background-color: var(--bg);
  }

  @font-face {
    font-family: 'GowunBatang';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/GowunBatang-Regular.woff')
      format('woff');
    font-weight: normal;
    font-style: normal;
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
  }

  p {
    margin: 0;
  }

  ul,
  li {
    list-style: none;
    padding: 0px;
  }

  button {
    all: unset;
  }

  img {
    -webkit-user-drag: none;
  }

  hr {
    border: none;
    border-top: 1px solid #e5e5e5;
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

export default GlobalStyles;
