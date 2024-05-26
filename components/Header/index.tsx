'use client';

import ThemeSwitch from '@/components/ThemeSwitch';
import MobileMenu from '@/components/MobileMenu';
import SiteConfig from '@/database/siteConfig';

import Link from 'next/link';
import { memo } from 'react';
import { usePathname } from 'next/navigation';
import * as css from './index.css';

function Header() {
  const pathname = usePathname();

  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <Link href="/" aria-label="home link">
          <div className={css.leftNav}>
            {pathname !== '/' && (
              <p className="header-title">{SiteConfig.title}</p>
            )}
          </div>
        </Link>
        <div className={css.rightNav}>
          <ThemeSwitch />
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}

export default memo(Header);
