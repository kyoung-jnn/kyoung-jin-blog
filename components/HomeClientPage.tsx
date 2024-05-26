/** @jsxImportSource @emotion/react */
'use client';

import styled from '@emotion/styled';
import Icon from '@/components/icons';
import Link from 'next/link';
import SITE_CONFIG from '@/database/siteConfig';
import { fadeLeft, fadeUp } from '@/utils/animation';

import { css } from '@emotion/react';
import media from '@/styles/media';
import menu from '@/constants/menu';

function HomeClientPage() {
  return (
    <>
      <Wrapper>
        <ContactSection>
          <Icon
            kind="mail"
            href={`mailto:${SITE_CONFIG.author.contacts.email}`}
            size={18}
          />
          <Icon
            kind="github"
            href={SITE_CONFIG.author.contacts.github}
            size={18}
          />
          <Icon
            kind="linkedin"
            href={SITE_CONFIG.author.contacts.linkedin}
            size={18}
          />
        </ContactSection>
        <MenuSection>
          {menu.map(({ href, name, description }) => (
            <Link href={href} key={name}>
              {name}
              <p
                css={css`
                  font-size: 14px;
                  margin-top: 4px;
                `}
              >
                {description}
              </p>
            </Link>
          ))}
        </MenuSection>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  position: relative;
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;
  margin-top: 60px;

  ${media.tablet} {
    padding: 0;
  }
`;

const ContactSection = styled.section`
  display: flex;
  margin-top: 20px;
  gap: 10px;

  animation: ${fadeUp} 1s forwards;
`;

const MenuSection = styled.nav`
  display: grid;
  margin: 36px 0;
  grid-template-columns: repeat(3, 1fr);
  opacity: 0;
  animation: ${fadeLeft} 1s 0.2s forwards;
`;

export default HomeClientPage;
