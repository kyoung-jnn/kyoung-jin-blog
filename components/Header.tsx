import styled, { css } from "styled-components";
import Link from "./Link";
import SiteConfig from "@/database/siteConfig";
import headerNavLinks from "@/constants/headerMenu";

function Header() {
  return (
    <StyledHeader>
      <>
        <Link href="/" aria-label="home link">
          <LeftHeaderContainer>
            <div className="header-image">🚀</div>
            <div className="header-title">{SiteConfig.title}</div>
          </LeftHeaderContainer>
        </Link>
      </>
      <RightHeaderContainer>
        <div className="hidden sm:block">
          {headerNavLinks.map(({ title, href }) => (
            <Link
              key={title}
              href={href}
              className="p-1 font-medium text-gray-900 sm:p-4 dark:text-gray-100"
            >
              {title}
            </Link>
          ))}
        </div>
        {/* <ThemeSwitch /> */}
        {/* <MobileNav /> */}
      </RightHeaderContainer>
    </StyledHeader>
  );
}

export default Header;

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 0;
`;

const LeftHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > .header-image {
    font-size: 48px;
  }

  > .header-title {
    display: none;
    font-weight: 700;
    font-size: 24px;

    @media (min-width: 640px) {
      display: block;
    }
  }
`;

const RightHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.6px;
`;
