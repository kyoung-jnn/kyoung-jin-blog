import NextImage, { ImageProps } from 'next/image';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

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

interface Props extends ImageProps {
  src: string;
  auto: boolean;
  size?: 'small' | 'medium' | 'large';
}

const Image = ({ src, auto = false, size = 'large', ...rest }: Props) => {
  return (
    <ImageWrapper aria-label="포스팅 이미지" auto={auto}>
      <NextImage
        src={src}
        layout={auto ? 'fill' : 'fixed'}
        objectFit={auto ? 'cover' : 'fill'}
        placeholder="blur"
        blurDataURL={src}
        style={{
          borderRadius: '5px',
        }}
        {...(!auto && sizes[size])}
        {...rest}
      />
    </ImageWrapper>
  );
};

const ImageWrapper = styled.div<{ auto: boolean }>`
  display: flex;
  justify-content: center;
  margin: 20px;
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

export default Image;
