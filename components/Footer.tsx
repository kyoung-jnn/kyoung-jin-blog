import styled from '@emotion/styled';
import siteConfig from '@/database/siteConfig';
// import SocialIcon from '@/components/icons';

function Footer() {
  return (
    <StyledFooter>
      {/*  <SocialContainer className="mb-3 flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:''`} size={6} />
          <SocialIcon
            kind="github"
            href={siteConfig.author.contacts.github}
            size={6}
          />
        </SocialContainer> */}
      <DescriptionContainer>
        <div>{siteConfig.author.name + ` © ${new Date().getFullYear()}`} </div>
      </DescriptionContainer>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
`;

const SocialContainer = styled.div`
  display: flex;
  margin-bottom: 12px;
`;

const DescriptionContainer = styled.div`
  display: flex;
  font-size: 16px;
  margin-bottom: 20px;
`;

export default Footer;
