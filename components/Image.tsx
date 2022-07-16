import NextImage from 'next/image';
import styled, { css } from 'styled-components';

const sizes = {
  small: {
    width: 352,
    height: 198,
  },
  medium: {
    width: 560,
    height: 315,
  },
  large: {
    width: 720,
    height: 405,
  },
} as const;

interface ImageProps {
  src: string;
  auto: boolean;
  size: 'small' | 'medium' | 'large';
}

const Image = ({ src, auto = false, size = 'large', ...rest }: ImageProps) => {
  return (
    <ImageWrapper aria-label="post image" auto={auto}>
      <LazyLoadImage
        src={src}
        alt={src}
        width={sizes[size].width}
        height={sizes[size].height}
        layout={auto ? 'fill' : 'fixed'}
        objectFit={auto ? 'cover' : 'fill'}
        placeholder="blur"
        blurDataURL={src}
        {...rest}
      />
    </ImageWrapper>
  );
};

const ImageWrapper = styled.div<{ auto: boolean }>`
  display: flex;
  justify-content: center;
  margin: 15px 0;
  ${({ auto }) =>
    auto &&
    css`
      display: block;
      & > span {
        position: unset !important;
      }
      & img {
        position: relative !important;
        height: auto !important;
      }
    `};
`;

const LazyLoadImage = styled(NextImage)`
  transition: 0.3s;
  border-radius: 5px;
`;

export default Image;
