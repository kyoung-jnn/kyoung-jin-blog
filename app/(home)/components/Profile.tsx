import SITE_CONFIG from '@/database/siteConfig';
import { desciption, title, wrapper } from './Profile.css';

function Profile() {
  return (
    <section className={wrapper}>
      <h2 className={title}>
        {SITE_CONFIG.author.enName} • {SITE_CONFIG.author.koName}
      </h2>
      <p className={desciption}>Frontend Engineer In Seoul, South Korea</p>
    </section>
  );
}

export default Profile;
