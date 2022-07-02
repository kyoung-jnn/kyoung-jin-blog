import NextImage from 'next/image';
import styled from 'styled-components';

const Image = ({ src, ...rest }: any) => {
  return (
    <ImageWrapper>
      <LazyLoadImage
        src={src}
        alt={src}
        placeholder="blur"
        blurDataURL={src}
        {...rest}
      />
    </ImageWrapper>
  );
};

const ImageWrapper = styled.span`
  display: flex;
  justify-content: center;
  margin: 15px 0;
`;

const LazyLoadImage = styled(NextImage)`
  transition: 0.3s;
`;

export default Image;
