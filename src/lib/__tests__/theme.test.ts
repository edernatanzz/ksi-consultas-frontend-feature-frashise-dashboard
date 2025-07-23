import { theme } from '@/lib/theme';

describe('Theme Configuration', () => {
  describe('Palette', () => {
    test('has correct primary colors', () => {
      expect(theme.palette.primary.main).toBe('#e02725'); // KSI Red
      expect(theme.palette.primary.light).toBe('#fca5a5');
      expect(theme.palette.primary.dark).toBe('#b91c1c');
    });
    
    test('has correct secondary colors', () => {
      expect(theme.palette.secondary.main).toBe('#64748b');
      expect(theme.palette.secondary.light).toBe('#cbd5e1');
      expect(theme.palette.secondary.dark).toBe('#112331'); // Corporate Blue
    });
    
    test('has correct utility colors', () => {
      expect(theme.palette.success.main).toBe('#10b981');
      expect(theme.palette.warning.main).toBe('#f59e0b');
      expect(theme.palette.error.main).toBe('#ef4444');
    });
  });
  
  describe('Typography', () => {
    test('has correct font family', () => {
      expect(theme.typography.fontFamily).toContain('Inter');
      expect(theme.typography.fontFamily).toContain('system-ui');
    });
    
    test('has correct heading configurations', () => {
      expect(theme.typography.h1.fontFamily).toContain('Poppins');
      expect(theme.typography.h1.fontWeight).toBe(700);
      
      expect(theme.typography.h2.fontFamily).toContain('Poppins');
      expect(theme.typography.h2.fontWeight).toBe(600);
      
      expect(theme.typography.h3.fontFamily).toContain('Poppins');
      expect(theme.typography.h3.fontWeight).toBe(600);
    });
  });
  
  describe('Component overrides', () => {
    test('has correct button styles', () => {
      const buttonStyles = theme.components?.MuiButton?.styleOverrides?.root;
      
      expect(buttonStyles).toHaveProperty('textTransform', 'none');
      expect(buttonStyles).toHaveProperty('borderRadius', 8);
      expect(buttonStyles).toHaveProperty('fontWeight', 500);
    });
    
    test('has correct card styles', () => {
      const cardStyles = theme.components?.MuiCard?.styleOverrides?.root;
      
      expect(cardStyles).toHaveProperty('borderRadius', 12);
      expect(cardStyles).toHaveProperty('boxShadow');
    });
  });
  
  describe('Theme structure', () => {
    test('has all required theme sections', () => {
      expect(theme).toHaveProperty('palette');
      expect(theme).toHaveProperty('typography');
      expect(theme).toHaveProperty('components');
    });
  });
});