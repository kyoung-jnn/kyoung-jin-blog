import SITE_CONFIG from '@/database/siteConfig';
import * as css from './Footer.css';

function Footer() {
  return (
    <footer className={css.footer}>
      {SITE_CONFIG.author.enName + ` © 2023`}{' '}
    </footer>
  );
}

export default Footer;
