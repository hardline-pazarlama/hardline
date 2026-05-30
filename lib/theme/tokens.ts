/**
 * Design tokens — the single source of truth for color, type, spacing,
 * radius and shadow. Screens/components must never hard-code raw values;
 * they read from the resolved theme produced by `useTheme`.
 */

import type { AccentKey } from '../types';

/* -------------------------------------------------------------------------- */
/*  Accent palette                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Each accent ships a `light` and `dark` variant so the highlight color stays
 * legible on both backgrounds. `muted` is the low-opacity fill used for chips,
 * badges and gradient overlays.
 */
export const ACCENTS: Record<
  AccentKey,
  { label: string; light: string; dark: string; mutedLight: string; mutedDark: string }
> = {
  iris: {
    label: 'Iris',
    light: '#6A5ACD',
    dark: '#7C9AFF',
    mutedLight: 'rgba(106,90,205,0.12)',
    mutedDark: 'rgba(124,154,255,0.18)',
  },
  amber: {
    label: 'Amber',
    light: '#FFB347',
    dark: '#FFC979',
    mutedLight: 'rgba(255,179,71,0.14)',
    mutedDark: 'rgba(255,201,121,0.18)',
  },
  azure: {
    label: 'Azure',
    light: '#2F95DC',
    dark: '#5DB7FF',
    mutedLight: 'rgba(47,149,220,0.12)',
    mutedDark: 'rgba(93,183,255,0.18)',
  },
  emerald: {
    label: 'Emerald',
    light: '#00B894',
    dark: '#3FD9B6',
    mutedLight: 'rgba(0,184,148,0.12)',
    mutedDark: 'rgba(63,217,182,0.18)',
  },
  rose: {
    label: 'Rose',
    light: '#E5547C',
    dark: '#FF7DA1',
    mutedLight: 'rgba(229,84,124,0.12)',
    mutedDark: 'rgba(255,125,161,0.18)',
  },
  violet: {
    label: 'Violet',
    light: '#9B5DE5',
    dark: '#C08CFF',
    mutedLight: 'rgba(155,93,229,0.12)',
    mutedDark: 'rgba(192,140,255,0.18)',
  },
};

/* -------------------------------------------------------------------------- */
/*  Base color ramps                                                          */
/* -------------------------------------------------------------------------- */

const lightBase = {
  background: '#F7F8FA',
  surface: '#FFFFFF',
  surfaceAlt: '#EFF1F5',
  textPrimary: '#111322',
  textSecondary: '#5C6173',
  border: '#E1E4EC',
  overlay: 'rgba(17,19,34,0.32)',
  success: '#00B894',
  danger: '#E5547C',
};

const darkBase = {
  background: '#0E101A',
  surface: '#171925',
  surfaceAlt: '#202336',
  textPrimary: '#EEF1FF',
  textSecondary: '#9095B2',
  border: '#2A2F45',
  overlay: 'rgba(0,0,0,0.55)',
  success: '#3FD9B6',
  danger: '#FF7DA1',
};

export type ColorScheme = typeof lightBase & {
  accent: string;
  accentMuted: string;
};

/* -------------------------------------------------------------------------- */
/*  Typography / spacing / radius / shadows                                   */
/* -------------------------------------------------------------------------- */

export const typography = {
  display: { fontSize: 28, fontWeight: '700' as const, lineHeight: 34 },
  headline: { fontSize: 20, fontWeight: '600' as const, lineHeight: 26 },
  body: { fontSize: 16, fontWeight: '500' as const, lineHeight: 22 },
  caption: { fontSize: 13, fontWeight: '500' as const, lineHeight: 18 },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
};

/**
 * Native shadow tokens. `web` box-shadow strings are derived from these in the
 * theme so the same elevation reads consistently across platforms.
 */
export const shadows = {
  soft: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 30,
    elevation: 8,
  },
  subtle: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
};

/* -------------------------------------------------------------------------- */
/*  Theme builder                                                             */
/* -------------------------------------------------------------------------- */

export interface Theme {
  scheme: 'light' | 'dark';
  colors: ColorScheme;
  typography: typeof typography;
  spacing: typeof spacing;
  radius: typeof radius;
  shadows: typeof shadows;
}

/** Resolve the full theme object for a given scheme + accent selection. */
export function buildTheme(scheme: 'light' | 'dark', accent: AccentKey): Theme {
  const base = scheme === 'light' ? lightBase : darkBase;
  const accentDef = ACCENTS[accent];
  return {
    scheme,
    colors: {
      ...base,
      accent: scheme === 'light' ? accentDef.light : accentDef.dark,
      accentMuted: scheme === 'light' ? accentDef.mutedLight : accentDef.mutedDark,
    },
    typography,
    spacing,
    radius,
    shadows,
  };
}
