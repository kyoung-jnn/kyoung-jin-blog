'use client';

import Link from 'next/link';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import IconButton from '@/components/IconButton';

import SITE_CONFIG from '@/database/config';
import MENU_LIST from '@/database/menu';
import { fadeLeft, fadeUp } from '@/utils/animation';



function Menu() {
  return (
    <Wrapper>
      <ContactSection>
        <Link
          href={`mailto:${SITE_CONFIG.author.contact.email}`}
          aria-label="mail link"
        >
          <IconButton name="Mail" />
        </Link>
        <Link
          href={SITE_CONFIG.author.contact.github}
          target="_blank"
          aria-label="github link"
        >
          <IconButton name="BrandGithub" />
        </Link>
        <Link
          href={SITE_CONFIG.author.contact.linkedin}
          target="_blank"
          aria-label="linked in link"
        >
          <IconButton name="BrandLinkedIn" />
        </Link>
      </ContactSection>
      <MenuSection>
        {MENU_LIST.map(({ href, name, description }) => (
          <div key={href}>
            <Link href={href}>
              <p
                css={css`
                  text-decoration: underline;
                  text-decoration-color: var(--gray-7);
                  text-underline-offset: 5px;

                  transition: text-decoration-color 0.4s;
                  :hover {
                    text-decoration-color: var(--gray-11);
                  }
                `}
              >
                {name}
              </p>
            </Link>
            <p
              css={css`
                font-size: 13px;
                margin-top: 10px;
              `}
            >
              {description}
            </p>{' '}
          </div>
        ))}
      </MenuSection>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  max-width: 640px;
  padding: 36px 12px;
`;

const ContactSection = styled.section`
  display: flex;
  gap: 10px;
  animation: ${fadeUp} 1s forwards;
`;

const MenuSection = styled.nav`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 36px;
  opacity: 0;
  animation: ${fadeLeft} 1s 0.2s forwards;
`;

export default Menu;
