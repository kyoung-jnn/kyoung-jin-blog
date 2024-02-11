import styled from '@emotion/styled';
import ThemeSwitch from '@/components/ThemeSwitch';
import MobileMenu from '@/components/MobileMenu';
import SiteConfig from '@/database/siteConfig';

import media from '@/styles/media';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo } from 'react';

function Header() {
  const router = useRouter();

  return (
    <Wrapper>
      <Nav>
        <Link href="/" aria-label="home link">
          <LeftHeaderContainer>
            {router.asPath !== '/' && (
              <div className="header-title">{SiteConfig.title}</div>
            )}
          </LeftHeaderContainer>
        </Link>
        <RightHeaderContainer>
          <ThemeSwitch />
          <MobileMenu />
        </RightHeaderContainer>
      </Nav>
    </Wrapper>
  );
}

export default memo(Header);

const Wrapper = styled.header`
  position: sticky;
  top: 0;
  height: 70px;
  z-index: 100;
  background: linear-gradient(to top, transparent, var(--bg));
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 672px;
  margin-left: auto;
  margin-right: auto;
  padding: 10px 16px;
`;

const LeftHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > .header-title {
    font-weight: 700;
    font-size: 16px;
  }
`;

const RightHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  gap: 6px;

  > .menu-list {
    display: none;

    ${media.mobile} {
      display: block;
    }
  }
`;
