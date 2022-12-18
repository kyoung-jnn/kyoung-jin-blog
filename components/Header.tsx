import styled from 'styled-components';
import Link from './CustomLink';
import ThemeSwitch from '@/components/ThemeSwitch';
import MobileNav from '@/components/MobileNav';
import SiteConfig from '@/database/siteConfig';
import headerNavLinks from '@/constants/headerMenu';
import media from '@/styles/media';
import BREAK_POINTS from '@/constants/breakpoints';

function Header() {
  return (
    <Wrapper>
      <Nav>
        <Link href="/" aria-label="home link">
          <LeftHeaderContainer>
            <div className="header-logo">🚀</div>
            <div className="header-title">{SiteConfig.title}</div>
          </LeftHeaderContainer>
        </Link>
        <RightHeaderContainer>
          <div className="menu-list">
            {headerNavLinks.map(({ title, href }) => (
              <Link key={title} href={href} className="menu-item">
                {title}
              </Link>
            ))}
          </div>
          <ThemeSwitch />
          <MobileNav />
        </RightHeaderContainer>
      </Nav>
    </Wrapper>
  );
}

export default Header;

const Wrapper = styled.header`
  position: sticky;
  top: 0;
  backdrop-filter: blur(4px);
  z-index: 100;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: ${BREAK_POINTS.tablet + 'px'};
  margin-left: auto;
  margin-right: auto;
  padding: 10px 15px;
`;

const LeftHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > .header-logo {
    font-size: 24px;
    margin-right: 10px;
  }

  > .header-title {
    display: none;
    font-weight: 700;
    font-size: 17px;

    ${media.mobile} {
      display: block;
    }
  }
`;

const RightHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;

  > .menu-list {
    display: none;

    ${media.mobile} {
      display: block;
    }

    > .menu-item {
      padding: 16px;
    }
  }
`;
