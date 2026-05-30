/**
 * Core domain types for Compilink.
 * Kept framework-agnostic so they can be reused by a future API layer.
 */

export type Platform = 'web' | 'youtube' | 'linkedin' | 'x' | 'pdf';

export type ItemStatus = 'new' | 'in-progress' | 'done';

export interface Category {
  id: string;
  name: string;
  emoji: string;
  description?: string;
  /** Accent color used for the card gradient / left border. */
  color: string;
  createdAt: string;
}

export interface Item {
  id: string;
  title: string;
  url: string;
  categoryId: string;
  platform: Platform;
  note?: string;
  /** Up to three short bullet points the user writes by hand. */
  summary?: string[];
  addedAt: string;
  isFavorite: boolean;
  status: ItemStatus;
}

export type ThemeMode = 'light' | 'dark' | 'system';

/** The six selectable accent colors surfaced in Settings + Onboarding. */
export type AccentKey =
  | 'iris'
  | 'amber'
  | 'azure'
  | 'emerald'
  | 'rose'
  | 'violet';

export type SortOrder = 'recent' | 'most-read';

export interface UserProfile {
  workspaceName: string;
  role: 'marketing' | 'product' | 'academic' | 'other';
  hasOnboarded: boolean;
}

export interface Preferences {
  themeMode: ThemeMode;
  accent: AccentKey;
  sortOrder: SortOrder;
}
