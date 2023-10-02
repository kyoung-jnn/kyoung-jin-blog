import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Sun from '@/components/icons/Sun';
import Moon from '@/components/icons/Moon';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import Image from 'next/image';

export const Theme = {
  light: 'light',
  dark: 'dark',
} as const;

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const themeClickHandler = () => {
    setTheme(theme === Theme.dark ? Theme.light : Theme.dark);
  };

  return (
    <StyledButton
      aria-label="Toggle Dark Mode"
      type="button"
      onClick={themeClickHandler}
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
        <Sun className="light-theme" />
      ) : (
        <Moon className="dark-theme" />
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
  width: 30px;
  height: 30px;
  margin-left: 10px;
  cursor: pointer;

  .light-theme {
    animation: ${rotateSun} 1s;
  }

  .dark-theme {
    animation: ${rotateMoon} 1s;
  }
`;

export default ThemeSwitch;
