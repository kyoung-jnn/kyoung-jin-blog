import Image from 'next/image';
import SITE_CONFIG from '@/database/siteConfig';
import { wrapper } from './Profile.css';

function Profile() {
  return (
    <section className={wrapper}>
      <Image
        src="https://avatars.githubusercontent.com/u/55469709?s=400&u=9d32f97f83bf19b48b488ce2c007f4a82b432c99&v=4"
        alt="프로필 이미지"
        aria-label="프로필 이미지"
        width={90}
        height={90}
        style={{ borderRadius: '50%' }}
      />
      <h3>
        {SITE_CONFIG.author.koName} • {SITE_CONFIG.author.enName}
      </h3>
      <p>Frontend Engineer</p>
      <p>In Seoul, South Korea</p>
    </section>
  );
}

export default Profile;
