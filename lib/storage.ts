/**
 * Thin, typed wrapper around AsyncStorage. Every persisted blob is JSON and
 * namespaced under `@compilink/*`. Reads never throw — they return `fallback`
 * so the UI can boot even if storage is corrupt or empty.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Category, Item, Preferences, UserProfile } from './types';

export const STORAGE_KEYS = {
  categories: '@compilink/categories',
  items: '@compilink/items',
  preferences: '@compilink/preferences',
  profile: '@compilink/profile',
  focus: '@compilink/focus',
} as const;

async function read<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (raw == null) return fallback;
    return JSON.parse(raw) as T;
  } catch (err) {
    if (__DEV__) console.warn(`[storage] failed to read ${key}`, err);
    return fallback;
  }
}

async function write<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    if (__DEV__) console.warn(`[storage] failed to write ${key}`, err);
  }
}

export const storage = {
  getCategories: (fallback: Category[]) => read(STORAGE_KEYS.categories, fallback),
  setCategories: (value: Category[]) => write(STORAGE_KEYS.categories, value),

  getItems: (fallback: Item[]) => read(STORAGE_KEYS.items, fallback),
  setItems: (value: Item[]) => write(STORAGE_KEYS.items, value),

  getPreferences: (fallback: Preferences) => read(STORAGE_KEYS.preferences, fallback),
  setPreferences: (value: Preferences) => write(STORAGE_KEYS.preferences, value),

  getProfile: (fallback: UserProfile) => read(STORAGE_KEYS.profile, fallback),
  setProfile: (value: UserProfile) => write(STORAGE_KEYS.profile, value),

  getFocusIds: (fallback: string[]) => read(STORAGE_KEYS.focus, fallback),
  setFocusIds: (value: string[]) => write(STORAGE_KEYS.focus, value),

  /** Used by Settings → Data export. */
  exportAll: async () => {
    const [categories, items, preferences, profile, focus] = await Promise.all([
      read(STORAGE_KEYS.categories, [] as Category[]),
      read(STORAGE_KEYS.items, [] as Item[]),
      read(STORAGE_KEYS.preferences, null),
      read(STORAGE_KEYS.profile, null),
      read(STORAGE_KEYS.focus, [] as string[]),
    ]);
    return { categories, items, preferences, profile, focus, exportedAt: new Date().toISOString() };
  },

  /** Used by Settings → Data import. Validates shape loosely before writing. */
  importAll: async (payload: { categories?: Category[]; items?: Item[] }) => {
    if (Array.isArray(payload.categories)) await write(STORAGE_KEYS.categories, payload.categories);
    if (Array.isArray(payload.items)) await write(STORAGE_KEYS.items, payload.items);
  },

  clearAll: async () => {
    await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
  },
};
