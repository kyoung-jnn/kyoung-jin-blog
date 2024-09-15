'use client';

import React, { ComponentProps } from 'react';
import { IconName, svg } from './svg';

interface Props extends ComponentProps<'svg'> {
  name: IconName;
}

function Icon({ name, ...attributes }: Props) {
  const Component = svg[name];
  return <Component {...attributes} />;
}

export default Icon;
