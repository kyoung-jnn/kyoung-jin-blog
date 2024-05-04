import { wrapper } from './layout.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section className={wrapper}>{children}</section>;
}
