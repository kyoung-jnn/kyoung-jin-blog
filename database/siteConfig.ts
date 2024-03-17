// site default configuration setting

const SITE_CONFIG = {
  title: `Kyoung Jin, Roh의 블로그`,
  author: {
    koName: '노경진',
    enName: 'Kyoung Jin, Roh',
    photo: '/public/profile.webp',
    bio: 'Frontend Engineer',
    contacts: {
      email: 'rudwls468@gmail.com',
      github: 'https://github.com/kyoung-jnn',
      rss: 'https://kyoung-jnn.com/rss.xml',
      linkedin:
        'https://www.linkedin.com/in/%EA%B2%BD%EC%A7%84-%EB%85%B8-028b7421b/',
      instagram: '',
    },
  },
  revalidateTime: 60 * 60 * 24 * 7, // a week
} as const;

export default SITE_CONFIG;
