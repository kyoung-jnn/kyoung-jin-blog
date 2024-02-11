import { RefObject, useEffect } from 'react';
import styled from '@emotion/styled';
import smoothscroll from 'smoothscroll-polyfill'; // Safari 에서 smooth 효과 적용
import ArrowUp from '@/components/icons/ArrowUp';
import Message from '@/components/icons/Message';

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
  right: 20px;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: var(--text);
  cursor: pointer;

  svg {
    width: 18px;
    height: 18px;
  }
`;

export default ScrollTopAndComment;
