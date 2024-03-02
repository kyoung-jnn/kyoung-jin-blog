import styled from '@emotion/styled';
import GalleryCaption from './GalleryCaption';

interface Props {
  src: string;
  alt: string;
}

function GalleryVideo({ src, alt }: Props) {
  return (
    <div>
      <Wrapper loop autoPlay muted preload="none">
        <source src={src} type="video/mp4" />
      </Wrapper>
      <GalleryCaption>{alt}</GalleryCaption>
    </div>
  );
}

export default GalleryVideo;

const Wrapper = styled.video`
  position: relative;
  width: 100%;
  height: 600px;
  object-fit: cover;
`;
