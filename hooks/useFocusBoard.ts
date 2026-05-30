/**
 * Focus Board — the "read these today" shortlist. Stores item ids and resolves
 * them to live items. Capped at 3 entries to match the dashboard design.
 */

import { useCallback, useMemo } from 'react';
import { useStore } from './useStore';

export const FOCUS_LIMIT = 3;

export function useFocusBoard() {
  const { focusIds, setFocusIds, items } = useStore();

  const focusItems = useMemo(
    () =>
      focusIds
        .map((id) => items.find((i) => i.id === id))
        .filter((i): i is NonNullable<typeof i> => Boolean(i)),
    [focusIds, items],
  );

  const isPinned = useCallback((id: string) => focusIds.includes(id), [focusIds]);

  const atCapacity = focusIds.length >= FOCUS_LIMIT;

  const toggleFocus = useCallback(
    (id: string) => {
      if (focusIds.includes(id)) {
        setFocusIds(focusIds.filter((f) => f !== id));
      } else if (focusIds.length < FOCUS_LIMIT) {
        setFocusIds([...focusIds, id]);
      }
    },
    [focusIds, setFocusIds],
  );

  const removeFocus = useCallback(
    (id: string) => setFocusIds(focusIds.filter((f) => f !== id)),
    [focusIds, setFocusIds],
  );

  return { focusItems, focusIds, isPinned, atCapacity, toggleFocus, removeFocus };
}
