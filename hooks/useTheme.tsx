/**
 * Theme context. Resolves `themeMode` (light/dark/system) + selected accent
 * into a concrete `Theme` object via `buildTheme`, and reacts to OS appearance
 * changes when in "system" mode.
 *
 * Preferences themselves live in the data store (`useStore`); this provider is
 * a thin reactive layer on top so any component can call `useTheme()` cheaply.
 */

import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { buildTheme, type Theme } from '@/lib/theme/tokens';
import type { AccentKey, ThemeMode } from '@/lib/types';

interface ThemeContextValue {
  theme: Theme;
  mode: ThemeMode;
  accent: AccentKey;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({
  mode,
  accent,
  children,
}: {
  mode: ThemeMode;
  accent: AccentKey;
  children: React.ReactNode;
}) {
  const system = useColorScheme() ?? 'light';
  const scheme = mode === 'system' ? system : mode;

  const value = useMemo<ThemeContextValue>(
    () => ({ theme: buildTheme(scheme, accent), mode, accent }),
    [scheme, accent, mode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a <ThemeProvider>');
  return ctx;
}
