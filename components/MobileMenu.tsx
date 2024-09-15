import { useState } from 'react';
import MENU_LIST from '@/database/menu';
import Link from 'next/link';
import styled from '@emotion/styled';
import media from '@/styles/media';
import { fadeLeft } from '@/utils/animation';
import IconButton from './IconButton';

function MobileMenu() {
  const [hasNav, setHasNav] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHasNav((status) => {
      if (status) {
        document.body.style.overflow = 'auto';
      } else {
        // Nav 뒤 화면 스크롤 기능 정지
        document.body.style.overflow = 'hidden';
      }
      return !status;
    });
  };

  return (
    <Wrapper>
      <HamburgerButton aria-label="Toggle Menu Button" onClick={handleClick}>
        <IconButton name="Menu" />
      </HamburgerButton>
      {hasNav && (
        <NavContainer>
          <Background />
          <MenuContainer onClick={handleClick}>
            {MENU_LIST.map(({ name, href }) => (
              <Link key={name} href={href}>
                <MenuItem>{name}</MenuItem>
              </Link>
            ))}
          </MenuContainer>
        </NavContainer>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: block;
  ${media.mobile} {
    display: none;
  }
`;

const NavContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  animation: ${fadeLeft} 0.5s ease-in-out;
`;

const HamburgerButton = styled.button`
  width: 24px;
  height: 24px;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--gray-3);
  opacity: 0.8;
`;

const MenuContainer = styled.section`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  z-index: 10;
`;

const MenuItem = styled.button`
  width: 100vw;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  padding: 30px;
  cursor: pointer;
  color: var(--gray-12);
`;

export default MobileMenu;
