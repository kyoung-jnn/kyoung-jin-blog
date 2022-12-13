import { css } from 'styled-components';
import 'highlight.js/styles/atom-one-dark-reasonable.css';

const MDXStyle = css`
  * {
    font-size: 16px;
    line-height: 1.8;
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
    font-size: 26px;
    margin-top: 20px;
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
    font-weight: 700;
    border-bottom: 2px solid var(--focus-text);
    margin: 0 0.5px;
  }
  li > code {
    font-weight: 700;
    border-bottom: 2px solid var(--focus-text);
    margin: 0 0.5px;
  }

  // 코드 블록
  pre > code {
    font-weight: 400;
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

  // 볼드체
  strong {
    font-weight: 700;
  }

  // '>' 표시
  blockquote {
    margin: 0;
    padding: 1px 10px;
    background-color: var(--focus-bg);
    border-radius: 10px;

    p > code {
      font-weight: 700;
    }
  }
`;

export default MDXStyle;
