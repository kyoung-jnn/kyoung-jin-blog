import { css } from 'styled-components';
import 'highlight.js/styles/atom-one-dark.css';

const MDXStyle = css`
  * {
    font-size: 16px;
    line-height: 1.5;
    letter-spacing: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 800;
    margin: 20px 0;
    letter-spacing: -0.5px;
  }

  h1 {
    font-size: 32px;
  }

  h2 {
    font-size: 26px;
  }

  h3 {
    font-size: 20px;
  }

  // 줄바꿈
  p {
    margin: 10px 0;
  }

  // 강조 글씨
  p > code {
    font-weight: 900;
    font-family: 'Ieter', sans-serif;
    border-bottom: 2px solid var(--focus-text);
    margin: 0 1px;
  }

  // 코드 블록
  pre > code {
    border-radius: 10px;
  }

  // 리스트
  ul,
  ol {
    margin: 10px;
  }

  li {
    margin: 10px;
    list-style: disc;
  }

  // '>' 표시
  blockquote {
    margin: 0;
    padding: 1px 10px;
    background-color: var(--focus-bg);
    border-radius: 10px;
  }
`;

export default MDXStyle;
