import styled from '@emotion/styled';
import galleryData from '@/database/gallery';
import GalleryPhoto from '@/components/GalleryPhoto';
import GalleryVideo from '@/components/GalleryVideo';
import { StaticImageData } from 'next/image';
import { PageSEO } from '@/components/SEO';
import SITE_METADATA from '@/database/siteMetadata';

function GalleryPage() {
  return (
    <>
      <PageSEO
        title={`Gallery | ${SITE_METADATA.title}`}
        description={`일상 및 여행 사진 | ${SITE_METADATA.description}`}
      />
      <Wrapper>
        {galleryData.map(({ type, src, alt }, index) => {
          if (type === 'image') {
            return (
              <GalleryPhoto
                key={index}
                src={src as StaticImageData}
                alt={alt}
              />
            );
          }
          return <GalleryVideo key={index} src={src as string} alt={alt} />;
        })}
      </Wrapper>
    </>
  );
}

export default GalleryPage;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  padding: 8px;
  gap: 6px;
  row-gap: 12px;
`;
