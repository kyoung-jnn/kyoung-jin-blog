import SITE_CONFIG from '@/database/config';
import * as styles from './Footer.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      {SITE_CONFIG.author.enName + ` © 2023`}{' '}
    </footer>
  );
}

export default Footer;
