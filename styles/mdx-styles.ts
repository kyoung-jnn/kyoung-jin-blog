import { css } from 'styled-components';
import 'highlight.js/styles/atom-one-dark-reasonable.css';

const MDXStyle = css`
  * {
    font-size: 18px;
    line-height: 1.6;
    letter-spacing: -0.2px;
    font-weight: 500;
    font-family: 'Ieter', sans-serif;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  h1 {
    font-size: 32px;
    margin-top: 32px;
  }

  h2 {
    font-size: 24px;
    margin-top: 20px;
  }

  h3 {
    font-size: 20px;
    margin-top: 12px;
  }

  // 줄바꿈
  p {
    margin-top: 10px 0;
  }

  // 볼드체
  strong {
    font-weight: 800;
  }

  // 강조 글씨
  p > code {
    font-weight: 600;
    border-radius: 5px;
    color: var(--blockquote-text);
    background-color: var(--code-bg);
    font-size: 90%;
    padding: 3.5px 5px;
  }

  p > strong > code {
    font-weight: 800;
    border-radius: 5px;
    color: var(--blockquote-text);
    background-color: var(--code-bg);
    font-size: 90%;
    padding: 3.5px 5px;
  }

  li > code {
    font-weight: 600;
    border-radius: 5px;
    color: var(--blockquote-text);
    background-color: var(--code-bg);
    font-size: 90%;
    padding: 3.5px 5px;
  }

  // '>' 표시
  blockquote {
    margin: 0;
    padding: 1px 10px;
    color: var(--blockquote-text);
    background-color: var(--blockquote-bg);
    border-radius: 10px;
  }

  // 코드 블록
  pre > code {
    position: relative;
    font-weight: 600;
    border-radius: 10px !important;
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

  a {
    color: var(--focus-text);
  }
`;

export default MDXStyle;
