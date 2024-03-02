import image_20240209 from '@/public/gallery/20240209.jpg';
import image_20240301_1 from '@/public/gallery/20240301_1.jpeg';
import image_20240301_2 from '@/public/gallery/20240301_2.jpeg';

export type GalleryItemType = 'image' | 'video';

const galleryData = [
  { type: 'image', src: image_20240209, alt: '합주 2024, 02' },
  {
    type: 'video',
    src: '/gallery/20240301_1.mp4',
    alt: '제주, 날씨 2024, 03',
  },
  { type: 'image', src: image_20240301_1, alt: '제주, 김창열 미술관 2024, 03' },
  { type: 'image', src: image_20240301_2, alt: '제주, 김창열 미술관 2024, 03' },
] as const;

export default galleryData;
