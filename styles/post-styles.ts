import { css } from '@emotion/react';

const PostStyles = css`
  font-family: 'Pretendard Variable';

  // highlight
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 600;
    letter-spacing: -0.04rem;
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
    font-size: 16px;
    font-weight: 400;
    line-height: 1.8;
  }

  a {
    transition: opacity 0.5s;
  }

  // bold
  strong,
  b {
    font-weight: 600;
  }

  blockquote {
    font-size: 16px;
    margin: 5px 0;
    border-left: 3px solid var(--focus-text);
  }

  // list 태그
  ul,
  ol {
    padding-inline-start: 1.2rem;
    font-size: 16px;
  }
  ul > li {
    list-style: disc;
  }
  ol > li {
    list-style: number;
  }

  // 노션 콜아웃
  .notion-callout {
    background-color: transparent;
  }

  // code 태그
  .notion-inline-code {
    font-size: 0.95rem;
    font-weight: 400;
    border-radius: 6px;
    color: var(--text);
    background-color: var(--code-bg);
    padding: 3px 4px;
    font-family:
      'Pretendard Variable',
      -apple-system;
  }

  // 코드 에디터
  .notion-code {
    background-color: #232323;
    overflow-y: hidden;
    code {
      font-size: 12px;
    }
  }
`;

export default PostStyles;
