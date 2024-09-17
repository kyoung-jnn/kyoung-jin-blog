'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import Icon from './Icon';

export const Theme = {
  light: 'light',
  dark: 'dark',
} as const;

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const handleClick = () => {
    setTheme(theme === Theme.dark ? Theme.light : Theme.dark);
  };

  return (
    <StyledButton
      type="button"
      aria-label="toggle theme button"
      onClick={handleClick}
    >
      {!mounted ? (
        <Image
          alt="theme-placeholder"
          src={
            'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
          }
          width={40}
          height={40}
        />
      ) : theme === Theme.light ? (
        <Icon name="Sun" className="light-theme" />
      ) : (
        <Icon name="Moon" className="dark-theme" />
      )}
    </StyledButton>
  );
};

const rotateSun = keyframes`
  0% {
      opacity: 0;
      transform: rotate(-90deg);
  }
  60% {
    opacity: 1;
    transform: rotate(20deg);
  }
  100% {
      opacity: 1;
      transform: rotate(0);
  }
`;

const rotateMoon = keyframes`
  0% {
      opacity: 0;
      transform: rotate(90deg);
  }
  60% {
    opacity: 1;
    transform: rotate(-20deg);
  }
  100% {
      opacity: 1;
      transform: rotate(0);
  }
`;

const StyledButton = styled.button`
  width: 24px;
  height: 24px;
  cursor: pointer;

  .light-theme {
    animation: ${rotateSun} 1s;
  }

  .dark-theme {
    animation: ${rotateMoon} 1s;
  }
`;

export default ThemeSwitch;
