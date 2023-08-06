import styled from '@emotion/styled';
import { ComponentProps } from 'react';

interface Props extends ComponentProps<'video'> {
  caption?: string;
}

function Video({ caption, ...attributes }: Props) {
  return (
    <Wrapper>
      <video width={'100%'} muted autoPlay loop {...attributes} />
      {Boolean(caption) && <figcaption>{caption}</figcaption>}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 20px;
`;

export default Video;
