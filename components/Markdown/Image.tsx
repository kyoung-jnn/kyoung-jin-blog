import NextImage, { ImageProps } from 'next/image';
import styled from '@emotion/styled';

interface Props extends ImageProps {
  src: string;
  caption?: string;
}

const Image = ({ src, caption, ...rest }: Props) => {
  return (
    <ImageWrapper aria-label="포스팅 이미지">
      <NextImage
        {...rest}
        src={src}
        fill
        style={{
          borderRadius: '5px',
        }}
      />
      {caption && <Caption>{caption}</Caption>}
    </ImageWrapper>
  );
};

const ImageWrapper = styled.figure`
  position: relative;
  display: block;
  justify-content: center;
  margin: 6px 0;

  & > span {
    position: unset !important;
  }
  & img {
    position: relative !important;
    height: auto !important;
  }
`;

const Caption = styled.figcaption`
  text-align: center;
  font-style: italic;
  font-size: 14px;
  color: var(--mid-text);
`;

export default Image;
