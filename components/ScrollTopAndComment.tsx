import { RefObject, useEffect, useState } from 'react';
import styled from 'styled-components';
import smoothscroll from 'smoothscroll-polyfill'; // Safari 에서 smooth 효과 적용
import ArrowUp from '@/components/icons/arrow-up';
import Message from '@/components/icons/message';

interface ScrollTopAndCommentProps {
  commentContainerRef: RefObject<HTMLDivElement>;
}

function ScrollTopAndComment({
  commentContainerRef,
}: ScrollTopAndCommentProps) {
  useEffect(() => {
    smoothscroll.polyfill();
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToComment = () => {
    if (commentContainerRef.current)
      commentContainerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
  };

  return (
    <Wrapper>
      <StyledButton
        aria-label="Scroll To Comment"
        type="button"
        onClick={handleScrollToComment}
      >
        <Message className="icon" />
      </StyledButton>
      <StyledButton
        aria-label="Scroll To Top"
        type="button"
        onClick={handleScrollTop}
      >
        <ArrowUp className="icon" />
      </StyledButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  right: 30px;
  bottom: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledButton = styled.button.attrs({ type: 'button' })`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--focus-bg);
  cursor: pointer;
  filter: drop-shadow(0px 0px 5px #d8d6e9);
  -webkit-tap-highlight-color: transparent !important;

  .icon {
    width: 25px;
    height: 25px;
    fill: var(--focus-text);
  }
`;

export default ScrollTopAndComment;