'use client';

import styled from '@emotion/styled';
import Link from 'next/link';
import SITE_CONFIG from '@/database/siteConfig';
import { fadeLeft, fadeUp } from '@/utils/animation';

import { css } from '@emotion/react';
import media from '@/styles/media';
import MENU_LIST from '@/database/menu';
import IconButton from '@/components/IconButton';

function Menu() {
  return (
    <>
      <Wrapper>
        <ContactSection>
          <Link href={`mailto:${SITE_CONFIG.author.contact.email}`}>
            <IconButton name="Mail" />
          </Link>
          <Link href={SITE_CONFIG.author.contact.github} target="_blank">
            <IconButton name="BrandGithub" />
          </Link>
          <Link href={SITE_CONFIG.author.contact.linkedin} target="_blank">
            <IconButton name="BrandLinkedIn" />
          </Link>
        </ContactSection>
        <MenuSection>
          {MENU_LIST.map(({ href, name, description }) => (
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
  margin: 36px 0;
`;

const ContactSection = styled.section`
  display: flex;
  gap: 10px;
  animation: ${fadeUp} 1s forwards;
`;

const MenuSection = styled.nav`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 36px 0;
  opacity: 0;
  animation: ${fadeLeft} 1s 0.2s forwards;
`;

export default Menu;
