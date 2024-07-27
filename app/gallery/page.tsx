'use client';

import GALLERY_DATA_LIST from '@/database/gallery';
import GalleryPhoto from './components/GalleryPhoto';
import GalleryVideo from './components/GalleryVideo';
import { StaticImageData } from 'next/image';

export default function GalleryPage() {
  return (
    <>
      {/* <PageSEO
        title={`Gallery | ${SITE_METADATA.title}`}
        description={`일상 및 여행 사진 | ${SITE_METADATA.description}`}
      /> */}
      {GALLERY_DATA_LIST.map(({ type, src, alt }, index) => {
        if (type === 'image') {
          return (
            <GalleryPhoto key={index} src={src as StaticImageData} alt={alt} />
          );
        }
        return <GalleryVideo key={index} src={src as string} alt={alt} />;
      })}
    </>
  );
}
