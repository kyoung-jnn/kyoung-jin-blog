import styled from 'styled-components';
import Link from './CustomLink';
import ThemeSwitch from '@/components/ThemeSwitch';
import MobileNav from '@/components/MobileNav';
import SiteConfig from '@/database/siteConfig';
import headerNavLinks from '@/constants/headerMenu';
import media from '@/styles/media';

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
  padding: 15px 0;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > .header-logo {
    font-size: 28px;
    margin-right: 10px;
  }

  > .header-title {
    display: none;
    font-weight: 700;
    font-size: 21px;

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
