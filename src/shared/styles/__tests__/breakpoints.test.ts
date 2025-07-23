import { describe, it, expect } from 'vitest';
import { breakpoints, media } from '../breakpoints';

describe('Responsive Utilities', () => {
  describe('breakpoints', () => {
    it('should have correct breakpoint values', () => {
      expect(breakpoints).toEqual({
        mobile: 0,
        tablet: 768,
        laptop: 1024,
        desktop: 1280,
        monitor: 1600,
      });
    });

    it('should have increasing breakpoint values', () => {
      expect(breakpoints.mobile).toBeLessThan(breakpoints.tablet);
      expect(breakpoints.tablet).toBeLessThan(breakpoints.laptop);
      expect(breakpoints.laptop).toBeLessThan(breakpoints.desktop);
      expect(breakpoints.desktop).toBeLessThan(breakpoints.monitor);
    });
  });

  describe('media queries', () => {
    it('should generate correct mobile media query', () => {
      expect(media.mobile).toBe('@media (max-width: 767px)');
    });

    it('should generate correct tablet media query', () => {
      expect(media.tablet).toBe('@media (min-width: 768px) and (max-width: 1023px)');
    });

    it('should generate correct laptop media query', () => {
      expect(media.laptop).toBe('@media (min-width: 1024px) and (max-width: 1279px)');
    });

    it('should generate correct desktop media query', () => {
      expect(media.desktop).toBe('@media (min-width: 1280px) and (max-width: 1599px)');
    });

    it('should generate correct monitor media query', () => {
      expect(media.monitor).toBe('@media (min-width: 1600px)');
    });

    it('should have no gaps between breakpoint ranges', () => {
      // Verifica que o max-width de um breakpoint é igual ao min-width do próximo -1
      expect(media.mobile).toContain(`max-width: ${breakpoints.tablet - 1}px`);
      expect(media.tablet).toContain(`min-width: ${breakpoints.tablet}px`);
      expect(media.tablet).toContain(`max-width: ${breakpoints.laptop - 1}px`);
      expect(media.laptop).toContain(`min-width: ${breakpoints.laptop}px`);
      expect(media.laptop).toContain(`max-width: ${breakpoints.desktop - 1}px`);
      expect(media.desktop).toContain(`min-width: ${breakpoints.desktop}px`);
      expect(media.desktop).toContain(`max-width: ${breakpoints.monitor - 1}px`);
      expect(media.monitor).toContain(`min-width: ${breakpoints.monitor}px`);
    });
  });
});