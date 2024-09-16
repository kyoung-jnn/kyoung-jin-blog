import SITE_CONFIG from '@/database/config';
import * as styles from './Profile.css';

function Profile() {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>
        {SITE_CONFIG.author.enName} • {SITE_CONFIG.author.name}
      </h2>
      <p className={styles.desciption}>
        Frontend Engineer In Seoul, South Korea
      </p>
    </section>
  );
}

export default Profile;
