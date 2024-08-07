import styled from '@emotion/styled';
import MailIcon from '@/components/icons/Mail';
import GithubIcon from '@/components/icons/Github';
import LinkedinIcon from '@/components/icons/Linkedin';
import { ComponentType } from 'react';

type IconType = 'mail' | 'github' | 'linkedin';

const Components: Record<IconType, ComponentType<{ className?: string }>> = {
  mail: MailIcon,
  github: GithubIcon,
  linkedin: LinkedinIcon,
};

const Icon = ({
  kind,
  href,
  size = 16,
}: {
  kind: IconType;
  href: string;
  size?: number;
}) => {
  if (!href) {
    return null;
  }

  const SelectedIcon = Components[kind];

  return (
    <StyledIcon size={size}>
      <a target="_blank" rel="noopener noreferrer" href={href}>
        <SelectedIcon className="icon" />
      </a>
    </StyledIcon>
  );
};

const StyledIcon = styled.div<{ size: number }>`
  display: inline-block;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;

  .icon {
    fill: var(--text);
    transition: fill 0.3s;
    &:hover {
      fill: var(--focus-text);
    }
  }
`;

export default Icon;
