/**
 * Category selectors + mutations layered over the central store.
 */

import { useCallback, useMemo } from 'react';
import { useStore } from './useStore';
import type { Category } from '@/lib/types';

const uid = () => `cat-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

export function useCategories() {
  const { categories, items, setCategories } = useStore();

  /** Count of items per category id — used for the count badges. */
  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const it of items) map[it.categoryId] = (map[it.categoryId] ?? 0) + 1;
    return map;
  }, [items]);

  const getCategory = useCallback(
    (id: string) => categories.find((c) => c.id === id),
    [categories],
  );

  const addCategory = useCallback(
    (input: Omit<Category, 'id' | 'createdAt'>) => {
      const category: Category = {
        ...input,
        id: uid(),
        createdAt: new Date().toISOString(),
      };
      setCategories([...categories, category]);
      return category;
    },
    [categories, setCategories],
  );

  const updateCategory = useCallback(
    (id: string, patch: Partial<Category>) => {
      setCategories(categories.map((c) => (c.id === id ? { ...c, ...patch } : c)));
    },
    [categories, setCategories],
  );

  const deleteCategory = useCallback(
    (id: string) => {
      setCategories(categories.filter((c) => c.id !== id));
    },
    [categories, setCategories],
  );

  return {
    categories,
    counts,
    getCategory,
    addCategory,
    updateCategory,
    deleteCategory,
  };
}
