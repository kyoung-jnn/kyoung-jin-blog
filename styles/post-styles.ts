import { css } from '@emotion/react';

const PostStyles = css`
  // highlight
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    span > span {
      font-weight: 700;
      letter-spacing: -0.02rem;
    }
  }

  h2 {
    font-size: 34px;
    margin-top: 28px;
  }

  h3 {
    font-size: 28px;
    margin-top: 26px;
  }

  h4 {
    font-size: 22px;
    margin-top: 26px;
  }

  // default p
  div {
    font-size: 17px;
    font-weight: 500;
    line-height: 1.8;
  }

  // bold
  strong,
  b {
    font-weight: 700;
  }

  .notion-inline-code {
    font-size: 0.95rem;
    font-weight: 600;
    border-radius: 3px;
    color: var(--blockquote-text);
    background-color: var(--code-bg);
    padding: 3px 4px;
    font-family:
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
  }

  blockquote {
    font-size: 16px;
    margin: 5px 0;
    padding: 6px 10px;
    color: var(--blockquote-text);
    background-color: var(--blockquote-bg);
    border-left: 3px solid var(--focus-text);
  }

  // list
  ul,
  ol {
    padding-inline-start: 1.6rem;
  }
  ul > li {
    list-style: disc;
  }
  ol > li {
    list-style: number;
  }

  a {
    color: var(--focus-text);
  }
`;

export default PostStyles;
