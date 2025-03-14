import { css } from '@emotion/react';

const PostStyles = css`
  * {
    font-family: inherit;
  }

  // highlight
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 600;
    letter-spacing: -0.2px;
  }

  h2 {
    font-size: 34px;
    margin-top: 22px;
  }

  h3 {
    font-size: 28px;
    margin-top: 18px;
  }

  h4 {
    font-size: 22px;
    margin-top: 14px;
  }

  // paragraph
  div {
    line-height: 1.7;
  }

  a {
    transition: opacity 0.4s;
  }

  // bold
  strong,
  b {
    font-weight: 600;
  }

  blockquote {
    font-size: 16px;
    margin: 4px 0;
    background-color: var(--gray-5);
  }

  // list
  ul,
  ol {
    padding-inline-start: 1.2rem;
    font-size: 15px;
  }
  li {
    padding: 3px 0px;
  }
  ul > li {
    list-style: disc;
  }
  ol > li {
    list-style: number;
  }

  table {
    width: 100%;
  }

  // callout
  .notion-callout {
    background-color: transparent;
  }

  // code
  .notion-inline-code {
    font-size: 0.95rem;
    border-radius: 3px;

    color: var(--gray-13);
    background-color: var(--gray-5);

    padding: 2px 4px;
  }

  // code editor
  .notion-code {
    background-color: #202020;
    overflow-y: hidden;
    code {
      font-size: 12px;
    }
  }

  .notion-external {
    margin: 10px 0pc;
  }

  // caption
  .notion-asset-caption {
    padding-top: 2px;
    padding-bottom: 0px;
  }

  // notion page properties
  .notion-collection-page-properties {
    display: none !important;
  }

  // table
  .notion-simple-table {
    width: auto;
    margin: 10px 20px;

    td {
      padding: 6px;
    }
  }
`;

export default PostStyles;
