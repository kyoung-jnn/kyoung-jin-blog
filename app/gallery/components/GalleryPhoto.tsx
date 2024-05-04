import { css } from '@emotion/react';
import Image, { StaticImageData } from 'next/image';
import GalleryCaption from '../../../components/GalleryCaption';

interface Props {
  src: StaticImageData;
  alt: string;
}

function GalleryPhoto({ src, alt }: Props) {
  return (
    <figure
      css={css`
        all: unset;
      `}
    >
      <article
        css={css`
          position: relative;
          width: 100%;
          height: 600px;
          border-radius: 1px;
          overflow: hidden;
        `}
      >
        <Image
          src={src}
          fill
          alt={alt}
          style={{ objectFit: 'cover' }}
          placeholder="blur"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </article>
      <GalleryCaption>{alt}</GalleryCaption>
    </figure>
  );
}

export default GalleryPhoto;
