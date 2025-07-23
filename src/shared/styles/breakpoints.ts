export const breakpoints = {
  mobile: 0,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
  monitor: 1600,
};

export const media = {
  mobile: `@media (max-width: ${breakpoints.tablet - 1}px)`,
  tablet: `@media (min-width: ${breakpoints.tablet}px) and (max-width: ${breakpoints.laptop - 1}px)`,
  laptop: `@media (min-width: ${breakpoints.laptop}px) and (max-width: ${breakpoints.desktop - 1}px)`,
  desktop: `@media (min-width: ${breakpoints.desktop}px) and (max-width: ${breakpoints.monitor - 1}px)`,
  monitor: `@media (min-width: ${breakpoints.monitor}px)`,
}; 