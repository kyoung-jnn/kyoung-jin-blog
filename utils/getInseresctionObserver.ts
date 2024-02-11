import { Dispatch, SetStateAction } from 'react';

const options = { threshold: 1 };

export const getScrollTableIntersectionObserver = (
  setCurrentTable: Dispatch<SetStateAction<string>>,
) => {
  let direction = '';
  let prevYposition = 0;

  // 스크롤 방향
  const getScrollDirection = (prevY: number) => {
    if (window.scrollY === 0 && prevY === 0) return;
    else if (window.scrollY > prevY) direction = 'down';
    else direction = 'up';

    prevYposition = window.scrollY;
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      getScrollDirection(prevYposition);

      if (
        (direction === 'down' && !entry.isIntersecting) ||
        (direction === 'up' && entry.isIntersecting)
      ) {
        setCurrentTable(entry.target.id);
      }
    });
  }, options);

  return observer;
};
