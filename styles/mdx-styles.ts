import { css } from '@emotion/react';
import SyntaxStyle from './syntax-styles';

const MDXStyle = css`
  * {
    line-height: 1.7;
    font-weight: 500;
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
    font-size: 26px;
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

  p {
    margin-top: 5px;
    margin-bottom: 0;
    font-size: 17px;
  }

  // 강조 글씨
  p > code {
    font-weight: 600;
    border-radius: 5px;
    color: var(--blockquote-text);
    background-color: var(--code-bg);
    font-size: 90%;
    padding: 3.5px 5px;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui,
      Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo',
      'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol', sans-serif;
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
    margin-top: 10px;
    padding: 1px 10px;
    color: var(--blockquote-text);
    background-color: var(--blockquote-bg);
    border-radius: 10px;
  }

  // 코드 블록
  ${SyntaxStyle}

  // 리스트
  ul {
    margin: 5px 20px;
    font-size: 17px;
  }

  ol {
    padding: 0;
    margin: 5px 20px;
    font-size: 17px;
  }

  ul > li {
    list-style: disc;
    margin: 5px;
  }
  ol > li {
    list-style: number;
    margin: 5px;
  }

  a {
    color: var(--focus-text);
  }
`;

export default MDXStyle;
