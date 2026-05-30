/**
 * Central data store. A single provider hydrates categories, items,
 * preferences, profile and the focus board from AsyncStorage on boot, then
 * keeps them in React state. All mutations write through to storage.
 *
 * The feature hooks (`useCategories`, `useItems`, `useFocusBoard`) are thin,
 * ergonomic selectors over this context — that keeps a single source of truth
 * and avoids the classic bug where two hooks read the same key independently
 * and drift out of sync.
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { storage } from '@/lib/storage';
import { SEED_CATEGORIES, SEED_ITEMS } from '@/lib/mockData';
import type { Category, Item, Preferences, UserProfile } from '@/lib/types';

const DEFAULT_PREFERENCES: Preferences = {
  themeMode: 'system',
  accent: 'iris',
  sortOrder: 'recent',
};

const DEFAULT_PROFILE: UserProfile = {
  workspaceName: 'Compilink',
  role: 'marketing',
  hasOnboarded: false,
};

interface StoreValue {
  hydrated: boolean;
  categories: Category[];
  items: Item[];
  focusIds: string[];
  preferences: Preferences;
  profile: UserProfile;

  setCategories: (next: Category[]) => void;
  setItems: (next: Item[]) => void;
  setFocusIds: (next: string[]) => void;
  setPreferences: (patch: Partial<Preferences>) => void;
  setProfile: (patch: Partial<UserProfile>) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [categories, setCategoriesState] = useState<Category[]>([]);
  const [items, setItemsState] = useState<Item[]>([]);
  const [focusIds, setFocusIdsState] = useState<string[]>([]);
  const [preferences, setPreferencesState] = useState<Preferences>(DEFAULT_PREFERENCES);
  const [profile, setProfileState] = useState<UserProfile>(DEFAULT_PROFILE);

  // Hydrate once on mount. Seed defaults the very first time the app runs.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [cats, its, focus, prefs, prof] = await Promise.all([
        storage.getCategories(SEED_CATEGORIES),
        storage.getItems(SEED_ITEMS),
        storage.getFocusIds([]),
        storage.getPreferences(DEFAULT_PREFERENCES),
        storage.getProfile(DEFAULT_PROFILE),
      ]);
      if (cancelled) return;
      setCategoriesState(cats);
      setItemsState(its);
      setFocusIdsState(focus);
      setPreferencesState(prefs);
      setProfileState(prof);
      setHydrated(true);

      // Persist seeds on first run so subsequent loads are stable.
      await Promise.all([storage.setCategories(cats), storage.setItems(its)]);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const setCategories = useCallback((next: Category[]) => {
    setCategoriesState(next);
    void storage.setCategories(next);
  }, []);

  const setItems = useCallback((next: Item[]) => {
    setItemsState(next);
    void storage.setItems(next);
  }, []);

  const setFocusIds = useCallback((next: string[]) => {
    setFocusIdsState(next);
    void storage.setFocusIds(next);
  }, []);

  const setPreferences = useCallback((patch: Partial<Preferences>) => {
    setPreferencesState((prev) => {
      const next = { ...prev, ...patch };
      void storage.setPreferences(next);
      return next;
    });
  }, []);

  const setProfile = useCallback((patch: Partial<UserProfile>) => {
    setProfileState((prev) => {
      const next = { ...prev, ...patch };
      void storage.setProfile(next);
      return next;
    });
  }, []);

  const value = useMemo<StoreValue>(
    () => ({
      hydrated,
      categories,
      items,
      focusIds,
      preferences,
      profile,
      setCategories,
      setItems,
      setFocusIds,
      setPreferences,
      setProfile,
    }),
    [hydrated, categories, items, focusIds, preferences, profile, setCategories, setItems, setFocusIds, setPreferences, setProfile],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within a <StoreProvider>');
  return ctx;
}
