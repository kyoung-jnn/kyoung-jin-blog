'use client';

import React, { ComponentProps } from 'react';

import styled from '@emotion/styled';

import Icon from './Icon';

interface Props extends ComponentProps<'button'> {
  name: ComponentProps<typeof Icon>['name'];
}

function IconButton({ name, ...attributes }: Props) {
  return (
    <Wrapper {...attributes}>
      <Icon name={name} />
    </Wrapper>
  );
}

export default IconButton;

const Wrapper = styled.button`
  display: flex;
  width: fit-content;
  height: fit-content;
  padding: 2px;
  border-radius: 3px;
  transition: background-color 0.2s;
  cursor: pointer;
  :hover {
    background-color: var(--gray-5);
  }
`;
