/**
 * Item selectors + mutations layered over the central store.
 * Sorting respects the user's `sortOrder` preference where relevant.
 */

import { useCallback, useMemo } from 'react';
import { useStore } from './useStore';
import type { Item, ItemStatus } from '@/lib/types';

const uid = () => `item-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

const byRecent = (a: Item, b: Item) => +new Date(b.addedAt) - +new Date(a.addedAt);

export function useItems() {
  const { items, setItems, preferences } = useStore();

  const sorted = useMemo(() => {
    const copy = [...items];
    if (preferences.sortOrder === 'most-read') {
      // "most read" ≈ done first, then in-progress, then new; recent within.
      const rank: Record<ItemStatus, number> = { done: 0, 'in-progress': 1, new: 2 };
      copy.sort((a, b) => rank[a.status] - rank[b.status] || byRecent(a, b));
    } else {
      copy.sort(byRecent);
    }
    return copy;
  }, [items, preferences.sortOrder]);

  const getItem = useCallback((id: string) => items.find((i) => i.id === id), [items]);

  const getRecentItems = useCallback(
    (limit = 4) => [...items].sort(byRecent).slice(0, limit),
    [items],
  );

  const getItemsByCategory = useCallback(
    (categoryId: string) => sorted.filter((i) => i.categoryId === categoryId),
    [sorted],
  );

  const addItem = useCallback(
    (input: Omit<Item, 'id' | 'addedAt' | 'isFavorite' | 'status'> & Partial<Pick<Item, 'isFavorite' | 'status'>>) => {
      const item: Item = {
        isFavorite: false,
        status: 'new',
        ...input,
        id: uid(),
        addedAt: new Date().toISOString(),
      };
      setItems([item, ...items]);
      return item;
    },
    [items, setItems],
  );

  const updateItem = useCallback(
    (id: string, patch: Partial<Item>) => {
      setItems(items.map((i) => (i.id === id ? { ...i, ...patch } : i)));
    },
    [items, setItems],
  );

  const deleteItem = useCallback(
    (id: string) => setItems(items.filter((i) => i.id !== id)),
    [items, setItems],
  );

  const toggleFavorite = useCallback(
    (id: string) =>
      setItems(items.map((i) => (i.id === id ? { ...i, isFavorite: !i.isFavorite } : i))),
    [items, setItems],
  );

  /** Cycle: new → in-progress → done → new. */
  const toggleStatus = useCallback(
    (id: string) =>
      setItems(
        items.map((i) => {
          if (i.id !== id) return i;
          const next: ItemStatus =
            i.status === 'new' ? 'in-progress' : i.status === 'in-progress' ? 'done' : 'new';
          return { ...i, status: next };
        }),
      ),
    [items, setItems],
  );

  /** Mark a specific status directly (used by the "okundu" action). */
  const setStatus = useCallback(
    (id: string, status: ItemStatus) =>
      setItems(items.map((i) => (i.id === id ? { ...i, status } : i))),
    [items, setItems],
  );

  return {
    items: sorted,
    getItem,
    getRecentItems,
    getItemsByCategory,
    addItem,
    updateItem,
    deleteItem,
    toggleFavorite,
    toggleStatus,
    setStatus,
  };
}
