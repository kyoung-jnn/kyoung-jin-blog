import BreakPoints from 'constants/breakpoints';

const mediaQuery = (minWidth: number) => `@media (min-width: ${minWidth}px)`;

const { moblie, tablet, desktop } = BreakPoints;

const media = {
  mobile: mediaQuery(moblie),
  tablet: mediaQuery(tablet),
  desktop: mediaQuery(desktop),
  custom: mediaQuery,
};

export default media;
