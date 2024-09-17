import ArrowLeft from '@/public/svg/arrow-left.svg';
import ArrowRight from '@/public/svg/arrow-right.svg';
import ArrowUpLeft from '@/public/svg/arrow-up-left.svg';
import ArrowUp from '@/public/svg/arrow-up.svg';
import BrandGithub from '@/public/svg/brand-github.svg';
import BrandLinkedIn from '@/public/svg/brand-linkedin.svg';
import CornerLeftUp from '@/public/svg/corner-left-up.svg';
import Mail from '@/public/svg/mail.svg';
import Menu from '@/public/svg/menu.svg';
import Messages from '@/public/svg/messages.svg';
import Moon from '@/public/svg/moon.svg';
import Search from '@/public/svg/search.svg';
import Sun from '@/public/svg/sun.svg';

export const svg = {
  ArrowUp,
  ArrowUpLeft,
  BrandGithub,
  BrandLinkedIn,
  CornerLeftUp,
  Mail,
  Messages,
  Menu,
  Sun,
  Moon,
  Search,
  ArrowRight,
  ArrowLeft,
};

export type IconName = keyof typeof svg;
