import { useState } from 'react';
import Menu from '@/components/icons/Menu';
import headerMenu from '@/constants/headerMenu';
import Link from 'next/link';
import styled from '@emotion/styled';
import media from '@/styles/media';
import { fadeLeft } from '@/utils/animation';

function MobileNav() {
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
        <Menu />
      </HamburgerButton>
      {hasNav && (
        <NavContainer>
          <Background />
          <MenuContainer onClick={handleClick}>
            {headerMenu.map(({ title, href }) => (
              <Link key={title} href={href}>
                <MenuItem>{title}</MenuItem>
              </Link>
            ))}
          </MenuContainer>
        </NavContainer>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  ${media.mobile} {
    display: none;
    cursor: pointer;
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
  width: 30px;
  height: 30px;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--focus-bg);
  opacity: 0.8;
`;

const MenuContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  z-index: 200;
`;

const MenuItem = styled.div`
  width: 100vw;
  font-size: 30px;
  font-weight: 800;
  text-align: center;
  padding: 30px;
  color: var(--focus-text);
`;

export default MobileNav;
