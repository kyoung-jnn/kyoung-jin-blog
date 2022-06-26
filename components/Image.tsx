import NextImage from 'next/image';
import styled from 'styled-components';

const Image = ({ src, ...rest }: any) => {
  return (
    <LazyLoadImage
      src={src}
      alt={src}
      placeholder="blur"
      blurDataURL={src}
      layout="responsive"
      {...rest}
    />
  );
};

const LazyLoadImage = styled(NextImage)`
  transition: 0.3s;
`;

export default Image;
