import GalleryCaption from '../../../components/GalleryCaption';
import { css } from '@emotion/react';

interface Props {
  src: string;
  alt: string;
}

function GalleryVideo({ src, alt }: Props) {
  return (
    <div>
      <video
        loop
        autoPlay
        muted
        playsInline
        css={css`
          position: relative;
          width: 100%;
          height: 600px;
          object-fit: cover;
          border-radius: 1px;
          overflow: hidden;
        `}
      >
        <source src={src} type="video/mp4" />
      </video>
      <GalleryCaption>{alt}</GalleryCaption>
    </div>
  );
}

export default GalleryVideo;
