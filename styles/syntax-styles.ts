import { css } from 'styled-components';

const SyntaxStyle = css`
  pre[data-theme='dark'] {
    color-scheme: dark;
  }

  @media (prefers-color-scheme: dark) {
    pre[data-theme='light'] {
      display: none;
    }
  }

  @media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {
    pre[data-theme='dark'] {
      display: none;
    }
  }

  // 타이틀
  div[data-rehype-pretty-code-title] {
    padding-left: 0.75rem;
    padding-top: 0.4rem;
    border-radius: 5px;
    font-size: 0.8rem;
    line-height: 1rem;
    color: var(--syntax-text);
    background-color: var(--syntax-bg);
  }

  // 배경
  div[data-rehype-pretty-code-fragment] {
    margin: 10px 0;
    border-radius: 5px;
    background-color: var(--syntax-bg);
  }

  div[data-rehype-pretty-code-fragment] pre {
    overflow-x: auto;
    margin: 0;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    font-size: 0.875rem;
    line-height: 1.5rem;
    border-radius: 5px;
    background-color: var(--syntax-bg);
  }

  // 라인
  div[data-rehype-pretty-code-fragment] .line {
    padding-left: 0.65rem;
    padding-right: 0.75rem;
    border-left-width: 100px;
    border-left-color: transparent;
  }

  // 라인 하이라이트
  div[data-rehype-pretty-code-fragment] .line-highlighted {
    background-color: #f8f8f225;
  }

  div[data-rehype-pretty-code-fragment] code {
    display: grid;
  }

  // 라인 넘버
  code[data-line-numbers] {
    counter-reset: lineNumber;
  }

  code[data-line-numbers] .line::before {
    counter-increment: lineNumber;
    content: counter(lineNumber);
    display: inline-block;
    text-align: right;
    margin-right: 0.75rem;
    width: 1rem;
    color: var(--syntax-text);
  }
`;

export default SyntaxStyle;
