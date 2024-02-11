import styled from '@emotion/styled';
import SITE_CONFIG from '@/database/siteConfig';

function Footer() {
  return <Wrapper>{SITE_CONFIG.author.enName + ` © 2023`} </Wrapper>;
}

const Wrapper = styled.footer`
  display: flex;
  justify-content: center;
  padding: 40px 0;
  font-size: 16px;
`;

export default Footer;
