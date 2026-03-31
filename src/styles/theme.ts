/**
 * Theme Configuration
 *
 * Centralized design system with colors, spacing, typography, and other design tokens.
 */

export const colors = {
  // Primary colors
  primary: '#007AFF',
  secondary: '#5856D6',

  // Status colors
  success: '#34C759',
  warning: '#FF9500',
  danger: '#FF3B30',

  // Neutral colors
  white: '#FFFFFF',
  black: '#000000',

  // Grays
  gray50: '#F5F5F5',
  gray100: '#E3E3E3',
  gray200: '#DDDDDD',
  gray300: '#CCCCCC',
  gray400: '#999999',
  gray500: '#666666',
  gray600: '#333333',

  // Background
  background: '#F5F5F5',
  surface: '#FFFFFF',

  // Borders
  border: '#DDDDDD',
  borderLight: '#E3E3E3',

  // Text
  text: '#333333',
  textSecondary: '#666666',
  textTertiary: '#999999',
  textDisabled: '#CCCCCC',

  // Highlights
  highlight: '#E3F2FD',
  highlightText: '#1976D2',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
} as const;

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 999,
} as const;

export const typography = {
  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
  },

  // Font weights
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
} as const;

// Export a complete theme object
export const theme = {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
} as const;

export type Theme = typeof theme;
export type Colors = typeof colors;
export type Spacing = typeof spacing;
