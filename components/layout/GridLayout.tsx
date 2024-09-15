import { PropsWithChildren } from 'react';
import { wrapper } from './GridLayout.css';

function GridLayout({ children }: PropsWithChildren) {
  return <section className={wrapper}>{children}</section>;
}

export default GridLayout;
