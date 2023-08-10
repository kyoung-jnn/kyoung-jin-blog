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
  auto?: boolean;
  size?: 'small' | 'medium' | 'large';
  caption?: string;
}

const Image = ({
  src,
  auto = true,
  size = 'medium',
  caption,
  ...rest
}: Props) => {
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
      {caption && <Caption>{caption}</Caption>}
    </ImageWrapper>
  );
};

const ImageWrapper = styled.figure<{ auto: boolean }>`
  display: flex;
  justify-content: center;
  margin: 10px;
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

const Caption = styled.figcaption`
  text-align: center;
  font-style: italic;
  font-size: 14px;
  color: var(--mid-text);
`;

export default Image;
