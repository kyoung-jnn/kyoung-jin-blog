import { css } from 'styled-components';
import 'highlight.js/styles/monokai-sublime.css';

const MDXStyle = css`
  * {
    font-size: 17px;
    line-height: 1.7;
    font-weight: 500;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui,
      Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo',
      'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol', sans-serif;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  h1 {
    font-size: 32px;
    margin-top: 20px;
  }

  h2 {
    font-size: 24px;
    margin-top: 20px;
  }

  h3 {
    font-size: 20px;
    margin-top: 14px;
  }

  // 볼드체
  strong {
    font-weight: 700;
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
    font-weight: 700;
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
    font-weight: 500;
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
