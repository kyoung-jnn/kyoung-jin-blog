import styled from '@emotion/styled';
import galleryData from '@/database/gallery';
import GalleryPhoto from '@/components/GalleryPhoto';
import GalleryVideo from '@/components/GalleryVideo';
import { StaticImageData } from 'next/image';

function GalleryPage() {
  return (
    <Wrapper>
      {galleryData.map(({ type, src, alt }, index) => {
        if (type === 'image') {
          return (
            <GalleryPhoto key={index} src={src as StaticImageData} alt={alt} />
          );
        }
        return <GalleryVideo key={index} src={src as string} alt={alt} />;
      })}
    </Wrapper>
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
