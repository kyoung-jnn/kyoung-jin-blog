'use client';

import ThemeSwitch from '@/components/ThemeSwitch';
import MobileMenu from '@/components/MobileMenu';
import SITE_CONFIG from '@/database/config';

import Link from 'next/link';
import { memo } from 'react';
import { usePathname } from 'next/navigation';
import * as styles from './Header.css';

function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" aria-label="home link">
          <p className={styles.leftNav}>
            {pathname !== '/' && SITE_CONFIG.author.enName}
          </p>
        </Link>
        <div className={styles.rightNav}>
          <ThemeSwitch />
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}

export default memo(Header);
