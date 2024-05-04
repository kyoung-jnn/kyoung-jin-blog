import { section } from './layout.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section className={section}>{children}</section>;
}
